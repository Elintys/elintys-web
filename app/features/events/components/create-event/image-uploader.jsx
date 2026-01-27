"use client";

import { useRef, useState } from "react";

export default function ImageUploader({ onUpload, previewUrl, loading }) {
  const fileInputRef = useRef(null);
  const [localPreview, setLocalPreview] = useState("");

  const handlePick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setLocalPreview(nextPreview);
    onUpload(file);
  };

  const preview = previewUrl || localPreview;

  return (
    <div className="space-y-3">
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">Apercu</span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Ajoutez une image de couverture pour votre evenement.
        </p>
        <button
          type="button"
          onClick={handlePick}
          disabled={loading}
          className="mt-4 px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Upload..." : "Choisir une image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
