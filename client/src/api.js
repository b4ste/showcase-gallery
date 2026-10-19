const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const storageKey = "showcase-gallery-demo-products";

export const usingApi = Boolean(apiUrl);

function readDemo() {
  try {
    const products = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(products) ? products : [];
  } catch {
    return [];
  }
}

function writeDemo(products) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(products));
  } catch {
    throw new Error("Browser storage is full. Try a smaller image or connect the API.");
  }
}

async function request(path = "", options = {}) {
  let response;
  try {
    response = await fetch(`${apiUrl}/api/products${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the API. Check VITE_API_URL and make sure the server is running.");
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `API request failed (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
}

export async function getProducts() {
  return usingApi ? request() : readDemo();
}

export async function createProduct(data) {
  if (usingApi) return request("", { method: "POST", body: JSON.stringify(data) });
  const product = { ...data, _id: crypto.randomUUID() };
  writeDemo([product, ...readDemo()]);
  return product;
}

export async function updateProduct(id, data) {
  if (usingApi) return request(`/${id}`, { method: "PUT", body: JSON.stringify(data) });
  const product = { ...data, _id: id };
  writeDemo(readDemo().map((item) => item._id === id ? product : item));
  return product;
}

export async function removeProduct(id) {
  if (usingApi) return request(`/${id}`, { method: "DELETE" });
  writeDemo(readDemo().filter((item) => item._id !== id));
  return null;
}
