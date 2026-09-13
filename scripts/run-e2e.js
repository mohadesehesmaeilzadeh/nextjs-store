const http = require("node:http");
const { spawn } = require("node:child_process");

const baseURL = "http://localhost:3000";
const serverArgs = ["./node_modules/next/dist/bin/next", "dev"];
const playwrightArgs = ["test", ...process.argv.slice(2)];

let serverProcess;
let stopping = false;

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
  if (!serverProcess || stopping) {
    return Promise.resolve();
  }

  stopping = true;

  if (process.platform === "win32") {
    return new Promise((resolve) => {
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
  }

  serverProcess.kill("SIGTERM");
  return Promise.resolve();
}

async function run() {
  serverProcess = spawn(process.execPath, serverArgs, {
    env: process.env,
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
