import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.OPBNB_EXPLORER_URL}/statistics/getStatisticsData`;

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 86400 } });
    const data = await response.json();
    const transferDayCount = data.data.transferDayCount;
    return NextResponse.json({ transferDayCount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
