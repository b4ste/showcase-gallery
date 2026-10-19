import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import ManagePage from "./pages/ManagePage";
import { createProduct, getProducts, removeProduct, updateProduct, usingApi } from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((items) => setProducts(Array.isArray(items) ? items : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function saveProduct(data) {
    setError("");
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, data);
        setProducts((items) => items.map((item) => item._id === editingProduct._id ? updated : item));
        setEditingProduct(null);
      } else {
        const created = await createProduct(data);
        setProducts((items) => [created, ...items]);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    try {
      await removeProduct(id);
      setProducts((items) => items.filter((item) => item._id !== id));
      if (editingProduct?._id === id) setEditingProduct(null);
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(product) {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar view={view} onChangeView={setView} usingApi={usingApi} />
      {error && <div role="alert" className="mx-auto mt-5 max-w-6xl rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</div>}
      {view === "gallery" ? (
        <GalleryPage products={products} loading={loading} />
      ) : (
        <ManagePage
          products={products}
          loading={loading}
          editingProduct={editingProduct}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          onEdit={startEdit}
          onDelete={deleteProduct}
        />
      )}
      <footer className="py-10 text-center text-sm text-slate-400">Made by Sebastian Cruz · INF233</footer>
    </div>
  );
}

export default App;
