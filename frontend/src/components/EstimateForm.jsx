import React, { useState } from "react";
import API from "../api/api";

export default function EstimateForm({ setResult }) {
  const [formData, setFormData] = useState({
    event_type: "",
    guest_count: "",
    services: [],
    budget: ""
  });

  const [mode, setMode] = useState("both");
  const [serviceInput, setServiceInput] = useState("");

  const servicesList = ["catering", "venue", "decoration", "photography", "entertainment"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const trimmed = serviceInput.trim().toLowerCase();
    if (trimmed && !formData.services.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, trimmed]
      }));
    }
    setServiceInput("");
  };

  const removeService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      guest_count: parseInt(formData.guest_count),
      budget: parseInt(formData.budget)
    };

    try {
      let res;
      if (mode === "estimate") {
        res = await API.post("/estimate", payload);
        setResult({ ...res.data, mode: "Estimation" });
      } else if (mode === "negotiate") {
        res = await API.post("/negotiate", payload);
        setResult({ ...res.data, mode: "Negotiation" });
      } else {
        const [estimateRes, negotiateRes] = await Promise.all([
          API.post("/estimate", payload),
          API.post("/negotiate", payload)
        ]);
        setResult({
          mode: "Both",
          total_cost: estimateRes.data.total_cost,
          ai_estimate_explanation: estimateRes.data.ai_estimate_explanation,
          bot_reply: negotiateRes.data.bot_reply
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        Manual Estimation & Negotiation
      </h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">Choose Action</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      >
        <option value="both">Estimate & Negotiate</option>
        <option value="estimate">Estimate Only</option>
        <option value="negotiate">Negotiate Only</option>
      </select>

      <label className="block mb-2 text-sm font-medium text-gray-700">Event Type</label>
      <input
        type="text"
        name="event_type"
        value={formData.event_type}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded"
        placeholder="e.g. Wedding"
        required
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Guest Count</label>
      <input
        type="number"
        name="guest_count"
        value={formData.guest_count}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded"
        placeholder="e.g. 150"
        required
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Add Services</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={serviceInput}
          onChange={(e) => setServiceInput(e.target.value)}
          placeholder="Type service and click Add"
          className="flex-grow px-4 py-2 border rounded"
        />
        <button
          onClick={handleAddService}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {formData.services.map((service, index) => (
          <span
            key={index}
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {service}
            <button
              type="button"
              onClick={() => removeService(service)}
              className="text-red-500 hover:text-red-700"
              title="Remove"
            >
              ❌
            </button>
          </span>
        ))}
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-700">Budget (₹)</label>
      <input
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded"
        placeholder="e.g. 50000"
        required
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
