import { NextResponse } from "next/server";

export async function GET() {
  const txnListUrl = `${process.env.XTERIO_EXPLORER_URL}/v2/transactions`;
  const blockListUrl = `${process.env.XTERIO_EXPLORER_URL}/v2/blocks`;

  try {
    const txnListResponse = await fetch(txnListUrl, { cache: "no-store" });
    const blockListResponse = await fetch(blockListUrl, { cache: "no-store" });

    const txnListData = await txnListResponse.json();
    const blockListData = await blockListResponse.json();

    const txnList = txnListData.items.slice(0, 5);
    const blockList = blockListData.items.slice(0, 5);

    return NextResponse.json({ txnList, blockList });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
