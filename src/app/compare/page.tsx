"use client";
import type { TvlDataItem } from "@/src/components/hero/Hero";
import { formatNumber } from "@/src/utils/FormatNumberMB";
import { ScientificToInt } from "@/src/utils/ScientificToInt";
import { TableBody } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { KpiData, TransferDayCount } from "../stats/types";
import type { Counter } from "../stats/xterio/types";
import { HeadTableCell, StyledTableCell, StyledTableRow } from "./Compare.styled";

interface L2SolutionProps {
  title: string;
  description: string;
  features: string[];
  useCases: string[];
  exampleProjects: string[];
}

const L2Solution: React.FC<L2SolutionProps> = ({ title, description, features, useCases, exampleProjects }) => (
  <div className="mt-4 shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold text-gray-100 mb-4">{title}</h2>
    <p className="text-gray-200 mb-4">{description}</p>
    <h3 className="text-xl font-semibold text-gray-200 mb-2">Key Features</h3>
    <ul className="list-disc list-inside mb-4 text-gray-200">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <h3 className="text-xl font-semibold text-gray-200 mb-2">Use Cases</h3>
    <ul className="list-disc list-inside mb-4 text-gray-200">
      {useCases.map((useCase, index) => (
        <li key={index}>{useCase}</li>
      ))}
    </ul>
    <h3 className="text-xl font-semibold text-gray-200 mb-2">
      Projects:{" "}
      <Link href="/dapps" className="underline">
        Check out dapps
      </Link>
    </h3>
  </div>
);
export default function Compare() {
  const [latestTvl, setLatestTvl] = useState<string | null>(null);
  const [tvlData, setTvlData] = useState<TvlDataItem[]>([]);
  const [addressCount, setAddressCount] = useState({ opBNB: 0, Combo: 0, Xterio: 0 });
  const [opBnbStatsData, setOpBnbStatsData] = useState<TransferDayCount[]>([]);
  const [opBnbKpiData, setOpBnbKpiData] = useState<KpiData | null>(null);
  const [opBnbFormattedData, setOpBnbFormattedData] = useState<TransferDayCount[]>([]);
  const [comboStatsData, setComboStatsData] = useState<TransferDayCount[]>([]);
  const [ComboKpiData, setComboKpiData] = useState<KpiData | null>(null);
  const [ComboFormattedData, setComboFormattedData] = useState<TransferDayCount[]>([]);
  const [xterioStatsData, setXterioStatsData] = useState<Record<string, string | number> | undefined>(undefined);

  const maxAddressCount = Math.max(addressCount.opBNB, addressCount.Combo, addressCount.Xterio);

  useEffect(() => {
    const opBnbData = opBnbStatsData.map((item) => ({
      ...item,
      average_gas_price: ScientificToInt(item.average_gas_price),
    }));
    const ComboData = comboStatsData.map((item) => ({
      ...item,
      average_gas_price: ScientificToInt(item.average_gas_price),
    }));
    setOpBnbFormattedData(opBnbData);
    setComboFormattedData(ComboData);
  }, [opBnbStatsData, comboStatsData]);

  function convertToIdValueObject(dataArray: Counter[]): Record<string, string | number> {
    return dataArray.reduce(
      (acc, item) => {
        acc[item.id] = item.value;
        return acc;
      },
      {} as Record<string, string | number>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tvlRes, addressRes, opBnbRes, comboRes, xterioRes] = await Promise.all([
          fetch("/api/tvl"),
          fetch("/api/addressCount"),
          fetch("/api/opBnbStats"),
          fetch("/api/comboStats"),
          fetch("/api/xterioStats"),
        ]);

        const [tvlData, addressCountData, opBnbStats, comboStats, xterioStats] = await Promise.all([
          tvlRes.json(),
          addressRes.json(),
          opBnbRes.json(),
          comboRes.json(),
          xterioRes.json(),
        ]);

        setTvlData(tvlData.data);
        setAddressCount(addressCountData);
        setOpBnbStatsData(opBnbStats.transferDayCount);
        setComboStatsData(comboStats.transferDayCount);

        const filteredXterioData = xterioStats.data.counters.filter(
          (counter: Counter) =>
            counter.id !== "lastNewVerifiedContracts" &&
            counter.id !== "totalNativeCoinTransfers" &&
            counter.id !== "totalTokens" &&
            counter.id !== "totalVerifiedContracts"
        );

        const formattedXterioData = filteredXterioData.map((item: Counter) => ({
          ...item,
          value: formatNumber(Number(item.value)),
        }));

        const convertedData = convertToIdValueObject(formattedXterioData);
        setXterioStatsData(convertedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  function getLatestEntry(data: TvlDataItem[]) {
    const latest_tvl = data.reduce((latest, current) => {
      return current.date > latest.date ? current : latest;
    }, data[0]);

    if (latest_tvl) {
      const formattedTvl = `$${formatNumber(latest_tvl.tvl)}`;
      setLatestTvl(formattedTvl);
    }
  }

  useEffect(() => {
    if (opBnbFormattedData && opBnbFormattedData.length > 0) {
      const latestData: TransferDayCount = opBnbFormattedData[opBnbFormattedData.length - 1];
      const kpi: KpiData = {
        daily_transaction_count: latestData.count,
        block_count: latestData.block_count,
        avg_block_time: latestData.avg_block_time,
        avg_block_size: latestData.avg_block_size,
        active_accounts: latestData.active_accounts,
        average_gas_price: latestData.average_gas_price,
        daily_deployed_contract: latestData.contract_create_transfer_count,
        tps_per_day: latestData.tps_per_day,
      };
      setOpBnbKpiData(kpi);
    }
    if (ComboFormattedData && ComboFormattedData.length > 0) {
      const latestData: TransferDayCount = ComboFormattedData[ComboFormattedData.length - 1];
      const kpi: KpiData = {
        daily_transaction_count: latestData.count,
        block_count: latestData.block_count,
        avg_block_time: latestData.avg_block_time,
        avg_block_size: latestData.avg_block_size,
        active_accounts: latestData.active_accounts,
        average_gas_price: latestData.average_gas_price,
        daily_deployed_contract: latestData.contract_create_transfer_count,
        tps_per_day: latestData.tps_per_day,
      };
      setComboKpiData(kpi);
    }
  }, [opBnbFormattedData, ComboFormattedData]);

  useEffect(() => {
    getLatestEntry(tvlData);
  }, [tvlData]);

  return (
    <div className="min-h-screen pb-20">
      <div className="flex flex-col gap-4 text-white leading-normal">
        <h1 className="text-4xl font-semibold">Choosing the Optimal Layer 2 Solution for Your dApp</h1>
        <p className="text-xl mb-4">
          As blockchain technology evolves, selecting the right Layer 2 (L2) solution for your decentralized application
          (dApp) is crucial for optimizing performance, scalability, and user experience. This guide provides an
          overview of three prominent L2 solutions: opBNB, COMBO, and Xterio, to help developers make informed decisions
          based on their specific needs and target audiences.
        </p>
        <TableContainer component={Paper} sx={{ background: "#141414", borderRadius: "10px" }}>
          <Table sx={{ minWidth: 650, display: "flex", flexDirection: "column" }}>
            <TableHead>
              <TableRow sx={{ display: "flex", flexDirection: "row" }}>
                <HeadTableCell>Label</HeadTableCell>
                <HeadTableCell>
                  <Image src="/images/op_bnb.svg" width={30} height={30} alt="logo" />
                  opBNB
                </HeadTableCell>
                <HeadTableCell>
                  <Image src="/images/combo.png" width={30} height={30} alt="logo" />
                  Combo
                </HeadTableCell>
                <HeadTableCell>
                  <Image src="/images/xterio.png" width={30} height={30} alt="logo" />
                  Xterio
                </HeadTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>Rollup Stack</StyledTableCell>
                <StyledTableCell sx={{ background: "#34c38f2e", color: "#34c38f" }}>Optimistic Rollup</StyledTableCell>
                <StyledTableCell sx={{ background: "#34c38f2e", color: "#34c38f" }}>Optimistic Rollup</StyledTableCell>
                <StyledTableCell sx={{ background: "#34c38f2e", color: "#34c38f" }}>Optimistic Rollup</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Use Case</StyledTableCell>
                <StyledTableCell sx={{ background: "#34c38f2e", color: "#34c38f" }}>Universal</StyledTableCell>
                <StyledTableCell>Gaming</StyledTableCell>
                <StyledTableCell>Gaming</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Total Value Locked</StyledTableCell>
                <StyledTableCell sx={{ background: "#34c38f2e", color: "#34c38f" }}>{latestTvl}</StyledTableCell>
                <StyledTableCell>NA</StyledTableCell>
                <StyledTableCell>NA</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Total Address Count</StyledTableCell>
                <StyledTableCell
                  sx={{ ...(addressCount.opBNB === maxAddressCount && { background: "#34c38f2e", color: "#34c38f" }) }}
                >
                  {addressCount.opBNB}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ ...(addressCount.Combo === maxAddressCount && { background: "#34c38f2e", color: "#34c38f" }) }}
                >
                  {addressCount.Combo}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ ...(addressCount.Xterio === maxAddressCount && { background: "#34c38f2e", color: "#34c38f" }) }}
                >
                  {addressCount.Xterio}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Average Gas Price</StyledTableCell>
                <StyledTableCell sx={{ background: "#34c38f2e", color: "#34c38f" }}>
                  {opBnbKpiData?.average_gas_price}
                </StyledTableCell>
                <StyledTableCell>{ComboKpiData?.average_gas_price}</StyledTableCell>
                <StyledTableCell>NA</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex flex-col gap-4 text-xl">
          <L2Solution
            title="opBNB: High-Performance Layer 2 Solution for BNB Chain"
            description="opBNB is a high-performance L2 scaling solution for the BNB Smart Chain (BSC), powered by the bedrock version of the Optimism OP Stack. It offloads transaction processing from the main chain while maintaining data integrity through periodic submissions to BSC."
            features={[
              "Optimistic Rollup Technology: Processes transactions off-chain, reducing computational load on BSC and enabling faster, cheaper transactions.",
              "Increased Transaction Throughput: Supports up to 5,000 transactions per second (TPS), addressing scalability challenges.",
              "Lower Transaction Fees: Offers reduced fees compared to BSC, making it suitable for micro-transactions and DeFi applications.",
              "Enhanced User Experience: Provides faster confirmations and lower costs, improving overall user interaction with dApps.",
              "Robust Security: Maintains high security through BSC’s model, with fraud-proof mechanisms to ensure transaction validity.",
            ]}
            useCases={[
              "DeFi Applications: Low fees and high throughput make it suitable for DeFi platforms.",
              "Gaming: Beneficial for in-game transactions and microtransactions.",
              "General dApp Development: Efficient scaling and reduced costs benefit various dApp types.",
            ]}
            exampleProjects={[
              "Xterio: A game developer using opBNB for high-performance gaming experiences, focusing on player ownership and community-driven development.",
            ]}
          />

          <L2Solution
            title="COMBO: Game-Focused Layer 2 Solution"
            description="COMBO is a game-focused L2 solution utilizing optimistic rollup technology, optimized for Web3 game developers. It offers high transaction throughput and extremely low gas prices, aiming to simplify and accelerate game development."
            features={[
              "High Throughput: Achieves over 5,000 TPS, supporting complex game interactions and transactions.",
              "Ultra-Low Gas Prices: Gas fees as low as 0.000000008 Gwei, making it cost-effective for game transactions.",
              "Comprehensive Development Tools: Provides a suite of development tools and built-in game engines.",
              "Partnerships with Leading Infrastructure Projects: Collaborates with top Web3 infrastructure providers for robust support.",
            ]}
            useCases={[
              "Web3 Gaming: Perfect for developers building blockchain-based games requiring high transaction volumes and low costs.",
              "Game Development Acceleration: Offers tools to streamline the development process.",
            ]}
            exampleProjects={[
              "Xterio: Utilizing COMBO for immersive multiplayer games with rich graphics and gameplay.",
            ]}
          />

          <L2Solution
            title="Xterio: Advanced Layer 2 for Web3 Gaming"
            description="Xterio is a Layer 2 solution dedicated to Web3 gaming, providing high-performance capabilities and extensive game development tools. It focuses on enhancing game experiences with blockchain technology while maintaining low transaction costs and high scalability."
            features={[
              "High Transaction Throughput: Supports a high volume of transactions per second, crucial for real-time gaming.",
              "Low Gas Fees: Minimizes transaction costs to ensure affordability for frequent in-game actions.",
              "Comprehensive Development Tools: Offers advanced tools and game engines for game development.",
              "Strong Industry Partnerships: Partners with leading Web3 infrastructure projects to support game development.",
            ]}
            useCases={[
              "Complex Gaming Projects: Supports games with high transaction requirements and complex interactions.",
              "Developer Tools: Provides resources to accelerate and simplify Web3 game development.",
            ]}
            exampleProjects={[
              "Xterio: Developing multiplayer games with deep experiences, leveraging blockchain for player ownership and enhanced gameplay.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
