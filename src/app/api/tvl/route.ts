import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.TVL_BASEURL}/historicalChainTvl/opBNB`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
