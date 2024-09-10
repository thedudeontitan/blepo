import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.TVL_BASEURL}/historicalChainTvl/opBNB`;

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 86400 } });
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
