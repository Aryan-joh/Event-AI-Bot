import React, { useState } from "react";
import API from "../api/api";

export default function UploadSection({ setResult }) {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("estimate"); // 'estimate', 'negotiate', or 'negotiate-only'

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      let endpoint = "";
      if (mode === "estimate") {
        endpoint = "/upload-estimate";
      } else if (mode === "negotiate") {
        endpoint = "/upload-negotiate";
      } else if (mode === "negotiate-only") {
        endpoint = "/upload-negotiate"; // Same endpoint, just UI message changes
      }

      const res = await API.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
    } catch (error) {
      alert("Upload failed. Please check file format and try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
    >
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        📎 Upload Event File
      </h2>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Mode
      </label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="mb-4 w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="estimate">Estimate Only</option>
        <option value="negotiate">Estimate + Negotiate</option>
        <option value="negotiate-only">Negotiate Only</option>
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 w-full text-gray-700 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
        required
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
      >
        Upload &{" "}
        {mode === "estimate"
          ? "Estimate"
          : mode === "negotiate"
          ? "Estimate + Negotiate"
          : "Negotiate"}
      </button>
    </form>
  );
}
