import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.XTERIO_EXPLORER_URL}/v2/stats`;

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 86400 } });
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
