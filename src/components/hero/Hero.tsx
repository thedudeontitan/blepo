"use client";
import opBnbLogo from "@/public/images/op_bnb.svg";
import { formatXAxis } from "@/src/utils/XAxisFormater";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { columns, rows, type Row } from "./colums";

export interface TvlDataItem {
  date: number;
  tvl: number;
}

export default function Hero() {
  const [latestTvl, setLatestTvl] = useState<string | null>(null);
  const [tvlData, setTvlData] = useState<TvlDataItem[]>([]);
  const [formattedRow, setFormattedRow] = useState<Row[]>([]);
  const [addressCount, setAddressCount] = useState({ opBNB: 0, Combo: 0, Xterio: 0 });

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

    const fetchAddressCount = async () => {
      try {
        const res = await fetch("/api/addressCount");
        const result = await res.json();
        setAddressCount(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    fetchAddressCount();
  }, []);

  function getLatestEntry(data: TvlDataItem[]) {
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

  useEffect(() => {
    getLatestEntry(tvlData);
  }, [tvlData]);

  const formatRow = (row: Row[]) => {
    if (latestTvl) {
      return row.map((item) => {
        item.name === "opBNB" ? (item.tvl = latestTvl) : (item.tvl = "Coming soon");
        item.name === "opBNB"
          ? (item.active_address = addressCount.opBNB)
          : item.name === "Combo"
            ? (item.active_address = addressCount.Combo)
            : item.name === "Xterio"
              ? (item.active_address = addressCount.Xterio)
              : (item.active_address = 0);
        return item;
      });
    }
  };

  useEffect(() => {
    const formatedRows = formatRow(rows);
    setFormattedRow(formatedRows || []);
  }, [latestTvl]);
  return (
    <div className="">
      <h1 className="text-4xl font-semibold mb-4 text-white ml-4">Overview</h1>
      <div className="w-full h-[50vh] mx-auto p-5 bg-primary rounded-2xl flex flex-col lg:flex-row gap-2">
        <div className=" flex lg:flex-col gap-5 text-xl text-white mb-5 lg:w-1/5 lg:pt-5">
          <div className="inline-flex gap-2">
            <div className="relative w-8 h-8">
              <Image src={opBnbLogo} fill className="object-contain" alt="logo" />
            </div>
            <span className=" font-semibold">opBNB</span>
          </div>
          <h3 className="text-lg text-white lg:mt-5">Total Value Locked</h3>
          <h2 className="text-3xl font-semibold">{latestTvl ? latestTvl : "Loading..."}</h2>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={tvlData} margin={{ right: 10, left: 10 }}>
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
      <div className="w-full mt-10 pb-20 text-white">
        <Box sx={{}}>
          <DataGrid
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#141414",
              color: "white",
              "& .MuiDataGrid-sortIcon": {
                opacity: 1,
                color: "white",
              },
              "& .MuiDataGrid-menuIconButton": {
                opacity: 1,
                color: "white",
              },
              border: 0,
              padding: 2,
              fontSize: "1.2rem",
              fontFamily: "inherit",
            }}
            rowHeight={70}
            rows={formattedRow}
            columns={columns}
            hideFooter
          />
        </Box>
      </div>
    </div>
  );
}
