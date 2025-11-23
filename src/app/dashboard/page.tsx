"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  status?: string;
  startedAt: string;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCalls() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/calls");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch call records");
        setMessages([]);
      } else {
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
            Dashboard
          </h1>
          <button
            onClick={fetchCalls}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Refreshing..." : "Refresh Calls"}
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your authentication is successful. Here are your call records:
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {messages.length === 0 && !error ? (
          <p className="text-gray-500">No calls available.</p>
        ) : (
          // Responsive Grid
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Transcript:</span>{" "}
                    {msg.transcript || "No transcript available"}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Summary:</span>{" "}
                    {msg.summary || "No summary available"}
                  </p>
                  {msg.recordingUrl && (
                    <p className="mb-2">
                      <a
                        href={msg.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        Listen to Recording
                      </a>
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Status: {msg.status || "Unknown"} <br />
                  Started at: {new Date(msg.startedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}




























// "use client";

// import { useEffect, useState } from "react";

// interface Message {
//   id: string;
//   transcript?: string;
//   summary?: string;
//   recordingUrl?: string;
//   status?: string;
//   startedAt: string;
// }

// export default function Dashboard() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function fetchCalls() {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch("/api/calls");
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to fetch call records");
//         setMessages([]);
//       } else {
//         setMessages(data);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Fetch calls on initial load
//   useEffect(() => {
//     fetchCalls();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
//       <p className="text-gray-600 mb-6">
//         Your authentication is successful. Here are your call records:
//       </p>

//       <button
//         onClick={fetchCalls}
//         className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Refreshing..." : "Refresh Calls"}
//       </button>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
//       )}

//       {messages.length === 0 && !error ? (
//         <p className="text-gray-500">No calls available.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
//             >
//               <p className="mb-2">
//                 <span className="font-semibold">Transcript:</span>{" "}
//                 {msg.transcript || "No transcript available"}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Summary:</span>{" "}
//                 {msg.summary || "No summary available"}
//               </p>
//               {msg.recordingUrl && (
//                 <p className="mb-2">
//                   <a
//                     href={msg.recordingUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                   >
//                     Listen to Recording
//                   </a>
//                 </p>
//               )}
//               <p className="text-sm text-gray-500 mt-2">
//                 Status: {msg.status || "Unknown"} | Started at:{" "}
//                 {new Date(msg.startedAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




















// // app/dashboard/page.tsx
// import React from "react";

// export default async function Dashboard() {
//   const api = process.env.VAPI_API_KEY; // Your API key in .env

//   // Fetch calls
//   const response = await fetch("https://api.vapi.ai/call", {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${api}`,
//     },
//   });

//   const messages = await response.json();

//   return (
//     <div className="container mx-auto p-4">
//       <div className="card bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//         <p className="text-gray-600 mb-6">
//           Your authentication is all sorted. Here are your call records:
//         </p>

//         {messages.length === 0 ? (
//           <p>No calls available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {messages.map((message: any) => (
//               <li
//                 key={message.id}
//                 className="border p-4 rounded hover:shadow transition"
//               >
//                 <p>
//                   <strong>Transcript:</strong>{" "}
//                   {message.transcript || "No transcript available"}
//                 </p>
//                 <p>
//                   <strong>Summary:</strong>{" "}
//                   {message.summary || "No summary available"}
//                 </p>
//                 {message.recordingUrl && (
//                   <p>
//                     <a
//                       href={message.recordingUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       Listen to Recording
//                     </a>
//                   </p>
//                 )}
//                 <p className="text-sm text-gray-500">
//                   Status: {message.status || "Unknown"} | Started at:{" "}
//                   {new Date(message.startedAt).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }


// import React from "react";

// interface Message {
//   id: string;
//   transcript?: string;
//   summary?: string;
//   recordingUrl?: string;
//   status?: string;
//   startedAt: string;
// }

// export default async function Dashboard() {
//   const api = process.env.VAPI_API_KEY; // Server-side only

//   let messages: Message[] = [];
//   let fetchError = "";

//   try {
//     const res = await fetch("https://api.vapi.ai/call", {
//       method: "GET",
//       headers: { Authorization: `Bearer ${api}` },
//       cache: "no-store", // always fetch fresh data
//     });

//     if (!res.ok) {
//       fetchError = `API Error: ${res.status} ${res.statusText}`;
//     } else {
//       messages = await res.json();
//     }
//   } catch (err) {
//     console.error(err);
//     fetchError = "Unable to fetch call records. Please try again later.";
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
//       <p className="text-gray-600 mb-6">
//         Your authentication is successful. Here are your call records:
//       </p>

//       {fetchError && (
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
//           {fetchError}
//         </div>
//       )}

//       {messages.length === 0 && !fetchError ? (
//         <p className="text-gray-500">No calls available.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
//             >
//               <p className="mb-2">
//                 <span className="font-semibold">Transcript:</span>{" "}
//                 {msg.transcript || "No transcript available"}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Summary:</span>{" "}
//                 {msg.summary || "No summary available"}
//               </p>
//               {msg.recordingUrl && (
//                 <p className="mb-2">
//                   <a
//                     href={msg.recordingUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                   >
//                     Listen to Recording
//                   </a>
//                 </p>
//               )}
//               <p className="text-sm text-gray-500 mt-2">
//                 Status: {msg.status || "Unknown"} | Started at:{" "}
//                 {new Date(msg.startedAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
