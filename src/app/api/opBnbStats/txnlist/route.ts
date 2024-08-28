import { NextResponse } from "next/server";

export async function GET() {
  const txnListUrl = `${process.env.OPBNB_EXPLORER_URL}/tx/getTxnList?page=1&pageSize=5`;
  const blockListUrl = `${process.env.OPBNB_EXPLORER_URL}/blocks/getBlocksList?page=1&pageSize=5`;

  try {
    const txnListResponse = await fetch(txnListUrl, { cache: "no-store" });
    const blockListResponse = await fetch(blockListUrl, { cache: "no-store" });

    const txnListData = await txnListResponse.json();
    const blockListData = await blockListResponse.json();

    const txnList = txnListData.data.list;
    const blockList = blockListData.data.list;

    return NextResponse.json({ txnList, blockList });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
