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


import React from "react";

interface Message {
  id: string;
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  status?: string;
  startedAt: string;
}

export default async function Dashboard() {
  const api = process.env.VAPI_API_KEY; // Server-side only

  let messages: Message[] = [];
  let fetchError = "";

  try {
    const res = await fetch("https://api.vapi.ai/call", {
      method: "GET",
      headers: { Authorization: `Bearer ${api}` },
      cache: "no-store", // always fetch fresh data
    });

    if (!res.ok) {
      fetchError = `API Error: ${res.status} ${res.statusText}`;
    } else {
      messages = await res.json();
    }
  } catch (err) {
    console.error(err);
    fetchError = "Unable to fetch call records. Please try again later.";
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Your authentication is successful. Here are your call records:
      </p>

      {fetchError && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {fetchError}
        </div>
      )}

      {messages.length === 0 && !fetchError ? (
        <p className="text-gray-500">No calls available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
            >
              <p className="mb-2">
                <span className="font-semibold">Transcript:</span>{" "}
                {msg.transcript || "No transcript available"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Summary:</span>{" "}
                {msg.summary || "No summary available"}
              </p>
              {msg.recordingUrl && (
                <p className="mb-2">
                  <a
                    href={msg.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Listen to Recording
                  </a>
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Status: {msg.status || "Unknown"} | Started at:{" "}
                {new Date(msg.startedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
