// src/App.jsx
import React, { useState, useRef } from "react";
import EstimateForm from "./components/EstimateForm";
import UploadSection from "./components/UploadSection";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleSetResult = (data) => {
    setResult(data);
    // Scroll to result section after result is set
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        🎉 Event Cost Estimator & Negotiation Bot
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EstimateForm setResult={handleSetResult} />
        <UploadSection setResult={handleSetResult} />
      </div>

      <div ref={resultRef}>
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
};

export default App;
