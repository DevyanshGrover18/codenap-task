import { useState } from "react";

const CLOUDINARY_CLOUD_NAME = 'drc2tmpf1'; 
const CLOUDINARY_UPLOAD_PRESET = 'codenap'; 

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url;
};

const Modal = ({ onClose, onSave, editItem }) => {
  const [title, setTitle] = useState(editItem?.title || "");
  const [description, setDescription] = useState(editItem?.desc || "");
  const [imgMode, setImgMode] = useState("url");
  const [urlImage, setUrlImage] = useState(editItem?.img || "");
  const [uploadedImage, setUploadedImage] = useState("");
  const image = imgMode === "url" ? urlImage : uploadedImage;
  const [preview, setPreview] = useState(editItem?.img || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";
    if (uploading) newErrors.image = "Please wait for image to finish uploading";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview instantly
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      setErrors((p) => ({ ...p, image: "" }));
      const url = await uploadToCloudinary(file);
      setUploadedImage(url);
    } catch (err) {
      console.error(err);
      setErrors((p) => ({ ...p, image: "Image upload failed. Try again." }));
      setPreview("");
      setUploadedImage("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await onSave({ id: editItem?._id, title, desc: description, img: image });
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: "slideUp 0.25s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-0.5">
              {editItem ? "Editing" : "New Entry"}
            </p>
            <h2 className="text-xl font-bold text-gray-900">
              {editItem ? "Update Item" : "Add Item"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors text-lg font-light"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter a title..."
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-red-400 focus:border-transparent ${
                errors.title ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((p) => ({ ...p, title: "" }));
              }}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              rows={3}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none ${
                errors.description ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((p) => ({ ...p, description: "" }));
              }}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image
            </label>

            {/* Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-3 w-fit gap-1">
              {["url", "upload"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setImgMode(mode);
                    setPreview(mode === "url" ? urlImage : uploadedImage);
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    imgMode === mode
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {mode === "url" ? "🔗 URL" : "📁 Upload"}
                </button>
              ))}
            </div>

            {imgMode === "url" ? (
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-red-400 focus:border-transparent ${
                  errors.image ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
                value={urlImage}
                onChange={(e) => {
                  setUrlImage(e.target.value);
                  setPreview(e.target.value);
                  setErrors((p) => ({ ...p, image: "" }));
                }}
              />
            ) : (
              !preview && (
                <label
                  className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.image ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                >
                  {uploading ? (
                    <>
                      <span className="w-6 h-6 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin mb-2" />
                      <span className="text-sm text-gray-500">Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl mb-1">🖼️</span>
                      <span className="text-sm text-gray-500">Click to browse or drag & drop</span>
                      <span className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )
            )}

            {errors.image && (
              <p className="text-xs text-red-500 mt-1">{errors.image}</p>
            )}

            {/* Preview */}
            {preview && (
              <div
                className="mt-3 relative rounded-lg overflow-hidden border border-gray-200 h-36"
                onMouseEnter={(e) =>
                  e.currentTarget.querySelector(".overlay").style.opacity = "1"
                }
                onMouseLeave={(e) =>
                  e.currentTarget.querySelector(".overlay").style.opacity = "0"
                }
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreview("")}
                />

                {/* Uploading overlay */}
                {uploading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-2" />
                    <span className="text-white text-xs font-medium">Uploading...</span>
                  </div>
                )}

                {/* Hover overlay */}
                {!uploading && (
                  <div
                    className="overlay absolute inset-0 flex items-center justify-center transition-opacity"
                    style={{ opacity: 0, backgroundColor: "rgba(0,0,0,0.3)" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        imgMode === "url" ? setUrlImage("") : setUploadedImage("");
                        setPreview("");
                      }}
                      className="bg-white text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Status badge */}
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded-full">
                  {uploading ? "⏳ Uploading..." : uploadedImage && imgMode === "upload" ? "✓ Cloudinary" : "Preview"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : uploading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading image...
              </>
            ) : editItem ? "Update Item" : "Add Item"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Modal;