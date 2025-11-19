// app/dashboard/page.tsx
import React from "react";

export default async function Dashboard() {
  const api = process.env.VAPI_API_KEY; // Your API key in .env

  // Fetch calls
  const response = await fetch("https://api.vapi.ai/call", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${api}`,
    },
  });

  const messages = await response.json();

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Your authentication is all sorted. Here are your call records:
        </p>

        {messages.length === 0 ? (
          <p>No calls available.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message: any) => (
              <li
                key={message.id}
                className="border p-4 rounded hover:shadow transition"
              >
                <p>
                  <strong>Transcript:</strong>{" "}
                  {message.transcript || "No transcript available"}
                </p>
                <p>
                  <strong>Summary:</strong>{" "}
                  {message.summary || "No summary available"}
                </p>
                {message.recordingUrl && (
                  <p>
                    <a
                      href={message.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Listen to Recording
                    </a>
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Status: {message.status || "Unknown"} | Started at:{" "}
                  {new Date(message.startedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
