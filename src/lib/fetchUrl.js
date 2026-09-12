export async function fetchUrl(url, options = {}) {
  if (!url) {
    throw new Error("A request URL is required.");
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`;

    try {
      const errorBody = await response.json();
      message = errorBody?.message || message;
    } catch {
      // Some APIs return an empty body for errors.
    }

    throw new Error(message);
  }

  return response.json();
}
