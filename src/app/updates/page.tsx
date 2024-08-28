"use client";
import { KpiCard } from "@/src/components/KpiCard";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { blkColumns, txnColumns, xterioBlkColumns, xterioTxnColumns } from "./columns";

function weiToGwei(wei: bigint): string {
  const gweiPerWei = BigInt(1_000_000_000);
  const result = Number(wei) / Number(gweiPerWei);
  return `${result.toFixed(18).replace(/\.?0+$/, "")} Gwei`;
}
export default function Updates() {
  const [opBnbTxnList, setOpBnbTxnList] = useState([]);
  const [opBnbBlockList, setOpBnbBlockList] = useState([]);
  const [comboTxnList, setComboTxnList] = useState([]);
  const [comboBlockList, setComboBlockList] = useState([]);
  const [xterioTxnList, setXterioTxnList] = useState([]);
  const [xterioBlockList, setXterioBlockList] = useState([]);

  const [opBnbStats, setOpBnbStats] = useState<LatestData>();
  const [comboStats, setComboStats] = useState<LatestData>();
  const [xterioStats, setXterioStats] = useState<LatestData>();

  useEffect(() => {
    const fetchOpBnbData = async () => {
      try {
        const opBnb = await fetch("/api/opBnbStats/txnlist");
        const opBnbResult = await opBnb.json();
        setOpBnbTxnList(opBnbResult.txnList);
        setOpBnbBlockList(opBnbResult.blockList);

        if (
          opBnbResult.txnList &&
          opBnbResult.txnList.length > 0 &&
          opBnbResult.blockList &&
          opBnbResult.blockList.length > 0
        ) {
          setOpBnbStats({
            ...opBnbStats,
            block_count: opBnbResult.blockList[0].number,
            gas_price: weiToGwei(opBnbResult.txnList[0].gasPrice),
            total_transactions: opBnbResult.txnCount,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchComboData = async () => {
      try {
        const combo = await fetch("/api/comboStats/txnlist");
        const comboResult = await combo.json();
        setComboTxnList(comboResult.txnList);
        setComboBlockList(comboResult.blockList);

        if (
          comboResult.txnList &&
          comboResult.txnList.length > 0 &&
          comboResult.blockList &&
          comboResult.blockList.length > 0
        ) {
          setComboStats({
            ...comboStats,
            block_count: comboResult.blockList[0].number,
            gas_price: weiToGwei(comboResult.txnList[0].gasPrice),
            total_transactions: comboResult.txnCount,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchXterioData = async () => {
      try {
        const xterio = await fetch("/api/xterioStats/txnlist");
        const xterioStats = await fetch("/api/xterioStats/stats");
        const xterioResult = await xterio.json();
        const xterioStatsResult = await xterioStats.json();

        setXterioTxnList(xterioResult.txnList);
        setXterioBlockList(xterioResult.blockList);

        if (
          xterioResult.txnList &&
          xterioResult.txnList.length > 0 &&
          xterioResult.blockList &&
          xterioResult.blockList.length > 0 &&
          xterioStatsResult.data.total_transactions
        ) {
          setXterioStats({
            ...xterioStats,
            block_count: xterioResult.blockList[0].height,
            gas_price: weiToGwei(xterioResult.txnList[0].gas_price),
            total_transactions: xterioStatsResult.data.total_transactions,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const interval = setInterval(() => {
      fetchOpBnbData();
      fetchComboData();
      fetchXterioData();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-white">Live Updates</h1>
      <div className="flex flex-col w-full gap-4">
        <div className="inline-flex gap-4 items-center">
          <Image src="/images/op_bnb.svg" width={30} height={30} alt="logo" />
          <h1 className="text-xl font-semibold text-white">OpBnb Feed</h1>
        </div>
        <div className="flex flex-row gap-4 w-full">
          {Object.entries(opBnbStats || {}).map(([key, value]) => (
            <KpiCard key={key} label={key.split("_").join(" ")} value={value} />
          ))}
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col w-full text-white bg-primary p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Latest 5 transactions</h2>
            <Box>
              <DataGrid
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#141414",
                  color: "white",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  border: 0,
                  fontSize: "1.2rem",
                  fontFamily: "inherit",
                }}
                getRowId={(row) => row.hash}
                rowHeight={70}
                rows={opBnbTxnList}
                columns={txnColumns}
                hideFooter
              />
            </Box>
          </div>
          <div className="flex flex-col w-full text-white bg-primary p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white ">Latest 5 Blocks</h2>
            <Box>
              <DataGrid
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#141414",
                  color: "white",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  border: 0,
                  fontSize: "1.2rem",
                  fontFamily: "inherit",
                }}
                getRowId={(row) => row.hash}
                rowHeight={70}
                rows={opBnbBlockList}
                columns={blkColumns}
                hideFooter
              />
            </Box>
          </div>
        </div>
      </div>

      <hr className="border-white border-opacity-30 border-b w-full" />

      <div className="flex flex-col w-full gap-4">
        <div className="inline-flex gap-4 items-center">
          <Image src="/images/combo.png" width={30} height={30} alt="logo" />
          <h1 className="text-xl font-semibold text-white">Combo Feed</h1>
        </div>
        <div className="flex flex-row gap-4 w-full">
          {Object.entries(comboStats || {}).map(([key, value]) => (
            <KpiCard key={key} label={key.split("_").join(" ")} value={value} />
          ))}
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col w-full text-white bg-primary p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Latest 5 transactions</h2>
            <Box>
              <DataGrid
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#141414",
                  color: "white",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  border: 0,
                  fontSize: "1.2rem",
                  fontFamily: "inherit",
                }}
                getRowId={(row) => row.hash}
                rowHeight={70}
                rows={comboTxnList}
                columns={txnColumns}
                hideFooter
              />
            </Box>
          </div>
          <div className="flex flex-col w-full text-white bg-primary p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white ">Latest 5 Blocks</h2>
            <Box>
              <DataGrid
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#141414",
                  color: "white",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  border: 0,
                  fontSize: "1.2rem",
                  fontFamily: "inherit",
                }}
                getRowId={(row) => row.hash}
                rowHeight={70}
                rows={comboBlockList}
                columns={blkColumns}
                hideFooter
              />
            </Box>
          </div>
        </div>
      </div>

      <hr className="border-white border-opacity-30 border-b w-full" />

      <div className="flex flex-col w-full gap-4">
        <div className="inline-flex gap-4 items-center">
          <Image src="/images/xterio.png" width={30} height={30} alt="logo" />
          <h1 className="text-xl font-semibold text-white">Xterio Feed</h1>
        </div>
        <div className="flex flex-row gap-4 w-full">
          {Object.entries(xterioStats || {}).map(([key, value]) => (
            <KpiCard key={key} label={key.split("_").join(" ")} value={value} />
          ))}
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col w-full text-white bg-primary p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Latest 5 transactions</h2>
            <Box>
              <DataGrid
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#141414",
                  color: "white",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  border: 0,
                  fontSize: "1.2rem",
                  fontFamily: "inherit",
                }}
                getRowId={(row) => row.hash}
                rowHeight={70}
                rows={xterioTxnList}
                columns={xterioTxnColumns}
                hideFooter
              />
            </Box>
          </div>
          <div className="flex flex-col w-full text-white bg-primary p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white ">Latest 5 Blocks</h2>
            <Box>
              <DataGrid
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#141414",
                  color: "white",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  border: 0,
                  fontSize: "1.2rem",
                  fontFamily: "inherit",
                }}
                getRowId={(row) => row.hash}
                rowHeight={70}
                rows={xterioBlockList}
                columns={xterioBlkColumns}
                hideFooter
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
