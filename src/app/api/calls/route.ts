import { NextResponse } from "next/server";

interface Message {
  id: string;
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  status?: string;
  startedAt: string;
}

export async function GET() {
  const apiKey = process.env.VAPI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.vapi.ai/call", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `VAPI Error: ${res.status} ${res.statusText}` },
        { status: res.status }
      );
    }

    const messages: Message[] = await res.json();
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch call records" },
      { status: 500 }
    );
  }
}
