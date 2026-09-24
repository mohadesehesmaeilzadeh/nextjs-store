const http = require("node:http");
const { spawn } = require("node:child_process");

const baseURL = "http://localhost:3000";
const productsApiURL = "http://127.0.0.1:3100/products";
const serverArgs = ["./node_modules/next/dist/bin/next", "dev"];
const playwrightArgs = ["test", ...process.argv.slice(2)];

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 89,
    category: "electronics",
    thumbnail: "https://cdn.dummyjson.com/e2e/wireless-headphones.webp",
    images: ["https://cdn.dummyjson.com/e2e/wireless-headphones.webp"],
    description: "Comfortable wireless headphones for work and travel.",
  },
  {
    id: 2,
    title: "Smart Desk Lamp",
    price: 46,
    category: "home",
    thumbnail: "https://cdn.dummyjson.com/e2e/smart-desk-lamp.webp",
    images: ["https://cdn.dummyjson.com/e2e/smart-desk-lamp.webp"],
    description: "A modern lamp with simple brightness controls.",
  },
  {
    id: 3,
    title: "Everyday Backpack",
    price: 72,
    category: "lifestyle",
    thumbnail: "https://cdn.dummyjson.com/e2e/everyday-backpack.webp",
    images: ["https://cdn.dummyjson.com/e2e/everyday-backpack.webp"],
    description: "A clean backpack with room for daily essentials.",
  },
];

let serverProcess;
let productsApiServer;
let stopping = false;

function startProductsApi() {
  productsApiServer = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, productsApiURL);
    response.setHeader("Content-Type", "application/json");

    if (requestUrl.pathname === "/products") {
      response.end(JSON.stringify({ products }));
      return;
    }

    const match = requestUrl.pathname.match(/^\/products\/(\d+)$/);
    const product = match
      ? products.find((item) => item.id === Number(match[1]))
      : null;

    if (!product) {
      response.statusCode = 404;
      response.end(JSON.stringify({ message: "Product not found" }));
      return;
    }

    response.end(JSON.stringify(product));
  });

  return new Promise((resolve, reject) => {
    productsApiServer.once("error", reject);
    productsApiServer.listen(3100, "127.0.0.1", resolve);
  });
}

function waitForServer(url, timeoutMs = 120000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    function check() {
      const request = http.get(url, (response) => {
        response.resume();
        resolve();
      });

      request.on("error", () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}`));
          return;
        }

        setTimeout(check, 500);
      });

      request.setTimeout(1000, () => {
        request.destroy();
      });
    }

    check();
  });
}

function stopServer() {
  if (stopping) {
    return Promise.resolve();
  }

  stopping = true;

  const stopProductsApi = new Promise((resolve) => {
    if (!productsApiServer) {
      resolve();
      return;
    }

    productsApiServer.close(() => resolve());
  });

  if (!serverProcess) {
    return stopProductsApi;
  }

  if (process.platform === "win32") {
    const stopNextServer = new Promise((resolve) => {
      const killer = spawn("taskkill", [
        "/pid",
        String(serverProcess.pid),
        "/T",
        "/F",
      ]);

      killer.on("error", () => {
        serverProcess.kill();
        resolve();
      });
      killer.on("exit", () => resolve());
    });

    return Promise.all([stopNextServer, stopProductsApi]);
  }

  serverProcess.kill("SIGTERM");
  return stopProductsApi;
}

async function run() {
  await startProductsApi();

  serverProcess = spawn(process.execPath, serverArgs, {
    env: { ...process.env, PRODUCTS_API_URL: productsApiURL },
    shell: false,
    stdio: "inherit",
  });

  serverProcess.on("exit", (code) => {
    if (!stopping && code !== null) {
      process.exitCode = code;
    }
  });

  await waitForServer(baseURL);

  const playwrightProcess = spawn(
    process.execPath,
    [require.resolve("@playwright/test/cli"), ...playwrightArgs],
    {
      env: process.env,
      shell: false,
      stdio: "inherit",
    },
  );

  const exitCode = await new Promise((resolve) => {
    playwrightProcess.on("exit", (code) => resolve(code || 0));
  });

  await stopServer();
  process.exit(exitCode);
}

process.on("SIGINT", async () => {
  await stopServer();
  process.exit(130);
});

process.on("SIGTERM", async () => {
  await stopServer();
  process.exit(143);
});

run().catch(async (error) => {
  console.error(error);
  await stopServer();
  process.exit(1);
});
