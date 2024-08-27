"use client";

import { KpiCard } from "@/src/components/KpiCard";
import { getMonthAbbreviation } from "@/src/utils/MonthFormatter";
import Image from "next/image";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartDataItem, Counter, DataItem } from "./types";

export default function Xterio() {
  const [statsData, setStatsData] = useState<Counter[]>([]);
  const [chartData, setChartData] = useState<ChartDataItem>();

  const formatNumber = (num: number): string => {
    return numeral(num).format("0.00a");
  };

  const formatXAxis = (date: string) => {
    const d = date.split("-");

    return `${getMonthAbbreviation(parseInt(d[1]))} ${d[0]}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/xterioStats");
        const result = await res.json();
        const data: Counter[] = result.data.counters;
        const filteredData = data.filter(
          (counter) =>
            counter.id !== "lastNewVerifiedContracts" &&
            counter.id !== "totalNativeCoinTransfers" &&
            counter.id !== "totalTokens" &&
            counter.id !== "totalVerifiedContracts"
        );

        const formattedData = filteredData.map((item) => ({ ...item, value: formatNumber(Number(item.value)) }));

        setStatsData(formattedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/xterioStats/chart");
        const result = await res.json();

        setChartData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const Chart = ({ title, data }: { title: string; data: DataItem[] }) => {
    const maxValue = useMemo(() => {
      return Math.max(...data.map((item) => Number(item.value)));
    }, [data]);

    return (
      <div className="flex flex-col w-full bg-primary p-5 rounded-2xl">
        <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`colorUv-value`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="60%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 3" stroke="#404040" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} fontSize="0.7rem" tick={{ fill: "#ffffff" }} />
            <YAxis
              fontSize="0.7rem"
              tickFormatter={formatNumber}
              tick={{ fill: "#ffffff" }}
              width={30}
              domain={[0, maxValue]}
            />
            <Tooltip itemStyle={{ color: "#000000" }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fillOpacity={1}
              fill={`url(#colorUv-value)`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="inline-flex gap-4 items-center mb-4">
        <Image src="/images/xterio.png" width={50} height={50} alt="logo" />
        <h1 className="text-3xl font-semibold text-white">Xterio Stats</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData && statsData.map((item) => <KpiCard key={item.id} label={item.title} value={item.value} />)}
      </div>
      {chartData && (
        <div>
          <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
            <Chart title="Daily Transaction Count" data={chartData.daily_new_txn} />
            <Chart title="Daily Active Accounts" data={chartData.active_accounts} />
          </div>
          <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
            <Chart title="Average Block Size" data={chartData.average_block_size} />
            <Chart title="Average Gas Price" data={chartData.average_gas_price} />
            <Chart title="Daily Deployed Contracts" data={chartData.daily_deployed_contracts} />
          </div>
          <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
            <Chart title="Total Transaction Count" data={chartData.total_txn} />
            <Chart title="Total Accounts" data={chartData.total_account_count} />
          </div>
        </div>
      )}
    </div>
  );
}
