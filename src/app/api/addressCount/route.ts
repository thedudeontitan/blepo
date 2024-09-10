import { NextResponse } from "next/server";

export async function GET() {
  const opBnbUrl = `${process.env.OPBNB_BASEURL}`;
  const comboUrl = `${process.env.COMBO_BASEURL}`;
  const xterioUrl = `${process.env.XTERIO_BASEURL}/stats`;

  try {
    const opBnbResponse = await fetch(opBnbUrl, {
      next: { revalidate: 86400 },
      method: "POST",
      body: JSON.stringify({
        id: 1,
        method: "nr_getAccountListCount",
        jsonrpc: "2.0",
        params: [],
      }),
    });
    const comboResponse = await fetch(comboUrl, {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        method: "nr_getAccountListCount",
        jsonrpc: "2.0",
        params: [],
      }),
    });
    const xterioResponse = await fetch(xterioUrl);

    const OBdata = await opBnbResponse.json();
    const CBdata = await comboResponse.json();
    const XTdata = await xterioResponse.json();
    return NextResponse.json({
      opBNB: parseInt(OBdata.result, 16),
      Combo: parseInt(CBdata.result, 16),
      Xterio: parseInt(XTdata.total_addresses),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
