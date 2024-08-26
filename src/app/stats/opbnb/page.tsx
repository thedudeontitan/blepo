"use client";

import type { TvlDataItem } from "@/src/components/hero/Hero";
import { KpiCard } from "@/src/components/KpiCard";
import { ScientificToInt } from "@/src/utils/ScientificToInt";
import { formatXAxis } from "@/src/utils/XAxisFormater";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { KpiData, TransferDayCount } from "./types";

export default function page() {
  const [statsData, setStatsData] = useState<TransferDayCount[]>([]);
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [tvlData, setTvlData] = useState<TvlDataItem[]>([]);

  const formattedData = statsData.map((item) => ({
    ...item,
    average_gas_price: ScientificToInt(item.average_gas_price),
  }));

  const formatNumber = (num: number): string => {
    return numeral(num).format("0.0a");
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/opBnbStats");
        const result = await res.json();
        setStatsData(result.transferDayCount);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formattedData && formattedData.length > 0) {
      const latestData: TransferDayCount = formattedData[formattedData.length - 1];
      const kpi: KpiData = {
        daily_transaction_count: latestData.count,
        block_count: latestData.block_count,
        avg_block_time: latestData.avg_block_time,
        avg_block_size: latestData.avg_block_size,
        active_accounts: latestData.active_accounts,
        average_gas_price: latestData.average_gas_price,
        contract_create_transfer_count: latestData.contract_create_transfer_count,
        tps_per_day: latestData.tps_per_day,
      };
      setKpiData(kpi);
    }
  }, [statsData]);

  const Chart = ({ dataKey, title }: { dataKey: string; title: string }) => {
    const maxValue = useMemo(() => {
      return Math.max(...formattedData.map((item: any) => item[dataKey] || 0));
    }, [formattedData, dataKey]);

    return (
      <div className="flex flex-col w-full bg-primary p-5 rounded-2xl">
        <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id={`colorUv-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="60%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 3" stroke="#404040" />
            <XAxis dataKey="timestamp" tickFormatter={formatXAxis} fontSize="0.7rem" tick={{ fill: "#ffffff" }} />
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
              dataKey={dataKey}
              stroke="#8884d8"
              fillOpacity={1}
              fill={`url(#colorUv-${dataKey})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <h1 className="text-3xl font-semibold text-white mb-4">OpBnb Stats</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData &&
          Object.entries(kpiData).map(([key, value]) => <KpiCard label={key.split("_").join(" ")} value={value} />)}
      </div>

      <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
        <Chart dataKey="count" title="Daily Transaction Count" />
        <Chart dataKey="active_accounts" title="Daily Active Accounts" />
      </div>
      <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
        <div className="flex flex-col w-full bg-primary p-5 rounded-2xl">
          <h2 className="text-white text-xl font-semibold mb-4">Total Value Locked</h2>
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
      </div>
      <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
        <Chart dataKey="tps_per_day" title="Daily TPS" />
        <Chart dataKey="average_gas_price" title="Average Gas Price (gwei)" />
        <Chart dataKey="avg_block_size" title="Average Block Size" />
      </div>
      <div className="flex flex-row w-full h-[45vh] mt-4 gap-4">
        <Chart dataKey="contract_create_transfer_count" title="Daily Deployed Contracts" />
        <Chart dataKey="nft_transfer_count" title="Daily NFT Transfers" />
      </div>
    </div>
  );
}
