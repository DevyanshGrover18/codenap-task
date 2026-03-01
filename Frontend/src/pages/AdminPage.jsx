import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/${activeTab}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
        showToast("Failed to load data", "error");
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/${activeTab}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Delete failed");
      setData((prev) => prev.filter((item) => item._id !== id));
      showToast("Item deleted successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to delete item", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const method = editItem ? "PUT" : "POST";
      const url = editItem
        ? `${import.meta.env.VITE_BASE_URL}/api/${activeTab}/${editItem._id}`
        : `${import.meta.env.VITE_BASE_URL}/api/${activeTab}`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Save failed");
      const updatedItem = await res.json();

      if (editItem) {
        setData((prev) =>
          prev.map((item) => (item._id === editItem._id ? updatedItem : item)),
        );
        showToast("Item updated successfully");
      } else {
        setData((prev) => [...prev, updatedItem]);
        showToast("Item added successfully");
      }

      setIsOpen(false);
    } catch (error) {
      console.error(error);
      showToast("Failed to save item", "error");
    }
  };

  const handleAdd = () => {
    setEditItem(null);
    setIsOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsOpen(true);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2"
          style={{
            backgroundColor: toast.type === "error" ? "#ef4444" : "#22c55e",
            animation: "slideIn 0.3s ease",
          }}
        >
          <span>{toast.type === "error" ? "✕" : "✓"}</span>
          {toast.message}
        </div>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 flex flex-col p-6 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            Dashboard
          </p>
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { key: "products", label: "Products", icon: "📦" },
            { key: "services", label: "Services", icon: "⚙️" },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-red-50 text-red-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{icon}</span>
              {label}
              {activeTab === key && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t">
          <p className="text-xs text-gray-400">
            {data.length} {activeTab} total
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-gray-700" />
              <span className="block w-5 h-0.5 bg-gray-700" />
              <span className="block w-5 h-0.5 bg-gray-700" />
            </div>
          </button>
          <h1 className="text-lg font-bold text-gray-900 capitalize">
            {activeTab}
          </h1>
          <button
            onClick={handleAdd}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            + Add
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-auto">
          <div className="hidden lg:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {activeTab}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your {activeTab} here
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="text-lg leading-none">+</span>
              Add New
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <span className="text-5xl mb-4">🗂️</span>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                No {activeTab} yet
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Get started by adding your first item
              </p>
              <button
                onClick={handleAdd}
                className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-all"
              >
                Add {activeTab.slice(0, -1)}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {item.desc}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 cursor-pointer bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="flex-1 cursor-pointer bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === item._id ? (
                          <span className="flex items-center justify-center gap-1">
                            <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            Deleting...
                          </span>
                        ) : (
                          "🗑️ Delete"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          editItem={editItem}
        />
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
