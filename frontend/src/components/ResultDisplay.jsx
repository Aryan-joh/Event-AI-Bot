import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
        🎯 Result Summary
      </h2>

      {result.event_data && (
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>📄 Event Type:</strong> {result.event_data.event_type}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>👥 Guest Count:</strong> {result.event_data.guest_count}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>🛠 Services:</strong> {result.event_data.services.join(", ")}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>💰 Budget:</strong> ₹{result.event_data.budget}
          </p>
        </div>
      )}

      <p className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
        ✅ Estimated Cost: ₹{result.total_cost}
      </p>

      {result.ai_estimate_explanation && (
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded mb-4">
          <p className="font-medium text-indigo-600 dark:text-indigo-300 mb-1">
            📊  Explanation:
          </p>
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {result.ai_estimate_explanation}
          </p>
        </div>
      )}

      {result.bot_reply && (
        <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded">
          <p className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">
            🤝 Negotiation Reply:
          </p>
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {result.bot_reply}
          </p>
        </div>
      )}

      {result.raw_text && (
        <details className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <summary className="cursor-pointer mb-2">🔍 Show Extracted Raw Text</summary>
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
            {result.raw_text}
          </pre>
        </details>
      )}
    </div>
  );
};

export default ResultDisplay;
