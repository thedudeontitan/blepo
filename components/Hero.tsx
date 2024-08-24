"use client";
import opBnbLogo from "@/public/images/op_bnb.svg";
import { getMonthAbbreviation } from "@/utils/MonthFormatter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DataItem {
  date: number;
  tvl: number;
}

export default function Hero() {
  const [latestTvl, setLatestTvl] = useState<string | null>(null);
  const [tvlData, setTvlData] = useState<DataItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/tvl");
        const result = await res.json();
        setTvlData(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  function getLatestEntry(data: DataItem[]) {
    const latest_tvl = data.reduce((latest, current) => {
      return current.date > latest.date ? current : latest;
    }, data[0]);

    const formatAsUSD = (value: number): string => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    };
    if (latest_tvl) {
      const formattedTvl = formatAsUSD(latest_tvl.tvl);
      setLatestTvl(formattedTvl);
    }
  }

  const formattedData = tvlData.map((item) => ({
    date: new Date(item.date * 1000).toLocaleDateString(),
    tvl: item.tvl,
  }));

  useEffect(() => {
    getLatestEntry(tvlData);
  }, [tvlData]);

  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleDateString();
    const splitDate = date.split("/");
    const formatedDate = `${getMonthAbbreviation(parseInt(splitDate[0]))} ${splitDate[2]}`;
    return formatedDate;
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full h-[50vh] mx-auto p-5 bg-black rounded-lg flex flex-col gap-2">
        <div className=" inline-flex items-center gap-1 text-xl text-white mb-5">
          <div className="relative w-8 h-8">
            <Image src={opBnbLogo} fill className="object-contain" alt="logo" />
          </div>
          <span className=" font-semibold">opBNB</span>: Total Value Locked
          <h2 className="text-lg text-white ml-auto">Current TVL: {latestTvl ? latestTvl : "Loading..."}</h2>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ right: 10, left: 10 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="60%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 3" stroke="#404040" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} fontSize="0.7rem" tick={{ fill: "#ffffff" }} />
            <YAxis fontSize="0.7rem" tick={{ fill: "#ffffff" }} />
            <Tooltip itemStyle={{ color: "#000000" }} />
            <Area type="monotone" dataKey="tvl" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
