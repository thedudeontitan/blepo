import { NextResponse } from "next/server";
import { comboData } from "./model";
import type { Dapps } from "./types";

export async function GET() {
  const opBnb = `${process.env.OPBNB_DAPP_URL}?page=1&pageSize=100&sortRankingKey=users&sortGranularity=weekly&sortType=desc&category=&chainInfoId=3&keyword=&is_new=0`;
  const xterio = `${process.env.XTERIO_DAPP_URL}`;

  try {
    const opBnbResponse = await fetch(opBnb, { next: { revalidate: 86400 } });
    const xterioResponse = await fetch(xterio, { next: { revalidate: 86400 } });
    const opBnbData = await opBnbResponse.json();
    const xterioData = await xterioResponse.json();

    let idCounter = 1;

    const opBnbFormattedData: Dapps[] = opBnbData.list
      .filter((item: any) => item.dapp.chain_info.some((chain: any) => chain.name === "opBNB"))
      .map((item: any) => ({
        id: idCounter++,
        name: item.dapp.name,
        category: item.dapp.category,
        description: item.dapp.description,
        website: item.dapp.website,
        logo: item.dapp.logo_url,
        tags: item.dapp.tags,
        chainName: item.dapp.chain_info
          .filter((chain: any) => chain.name === "opBNB")
          .map((chain: any) => chain.name)
          .toString(),
        dailyUsers: item.staticInfo.daily.users.value,
        dailyTxns: item.staticInfo.daily.txns.value,
      }));

    const xterioFormattedData: Dapps[] = xterioData.data.map((item: any) => ({
      id: idCounter++,
      name: item.name,
      category: "Game",
      description: item.describe,
      website: item.social_media?.find((social: any) => social.name === "website")?.link || "",
      logo: item.resources.icon,
      tags: item.genre,
      chainName: "xterio",
      dailyUsers: "",
      dailyTxns: "",
    }));

    const comboFomattedData: Dapps[] = comboData.map((item: any) => ({
      ...item,
      id: idCounter++,
    }));
    const res = [...opBnbFormattedData, ...xterioFormattedData, ...comboFomattedData];

    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
