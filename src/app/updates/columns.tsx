"use client";

import ArticleIcon from "@mui/icons-material/Article";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Box, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

function shortenHash(hash: string, startLength = 5, endLength = 5) {
  if (hash) {
    const start = hash.slice(0, startLength);
    const end = hash.slice(-endLength);
    return `${start}...${end}`;
  }
}

function xterioGetTimeDifferenceInSeconds(inputTime: string): number {
  const inputDate = new Date(inputTime);
  const now = new Date();
  const differenceInMs = now.getTime() - inputDate.getTime();
  const differenceInSeconds = Math.floor(differenceInMs / 1000);
  return differenceInSeconds;
}

export const txnColumns: GridColDef[] = [
  {
    field: "hash",
    headerName: "Txn Hash",
    minWidth: 200,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;
      function getTimeDifferenceInSeconds(epochTime: number) {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime - epochTime;
      }
      return (
        <div className="inline-flex gap-2 h-full items-center">
          <SyncAltIcon sx={{ fontSize: "25px" }} />
          <Box>
            <Typography fontSize={16}>{shortenHash(rowData.hash)}</Typography>
            <Typography className="text-gray-400">{getTimeDifferenceInSeconds(rowData.blockTimeStamp)}s ago</Typography>
          </Box>
        </div>
      );
    },
  },
  {
    field: "from",
    headerName: "From",
    minWidth: 200,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;
      return (
        <div className="flex flex-col justify-center h-full gap-2">
          <Typography fontSize={14}>From: {shortenHash(rowData.from)}</Typography>
          <div className="inline-flex items-center h-[1.2rem]">
            <Typography fontSize={14}>To:</Typography>
            <ArticleIcon />
            <Typography fontSize={14}> {shortenHash(rowData.to)}</Typography>
          </div>
        </div>
      );
    },
  },
  {
    field: "value",
    headerName: "Value",
    minWidth: 100,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      function hexToEther(hexValue: string) {
        const weiValue = BigInt(hexValue);
        const etherValue = Number(weiValue) / 10 ** 18;
        return etherValue;
      }

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <Typography fontSize={16}>{hexToEther(rowData.value)}</Typography>
          <Typography fontSize={16}>{rowData.asset}</Typography>
        </div>
      );
    },
  },
];

export const blkColumns: GridColDef[] = [
  {
    field: "number",
    headerName: "Block",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;
      function getTimeDifferenceInSeconds(epochTime: number) {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime - epochTime;
      }
      return (
        <div className="inline-flex gap-2 h-full items-center">
          <ViewInArIcon sx={{ fontSize: "25px" }} />
          <Box>
            <Typography fontSize={16}>{rowData.number}</Typography>
            <Typography className="text-gray-400">{getTimeDifferenceInSeconds(rowData.timestamp)}s ago</Typography>
          </Box>
        </div>
      );
    },
  },
  {
    field: "txCount",
    headerName: "No. Txn",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <Typography fontSize={16}>{rowData.txCount}</Typography>
        </div>
      );
    },
  },
  {
    field: "gasUsed",
    headerName: "Gas Used",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <Typography fontSize={16}>{rowData.gasUsed}</Typography>
        </div>
      );
    },
  },
];

export const xterioTxnColumns: GridColDef[] = [
  {
    field: "hash",
    headerName: "Txn Hash",
    minWidth: 200,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <SyncAltIcon sx={{ fontSize: "25px" }} />
          <Box>
            <Typography fontSize={16}>{shortenHash(rowData.hash)}</Typography>
            <Typography className="text-gray-400">
              {xterioGetTimeDifferenceInSeconds(rowData.timestamp)}s ago
            </Typography>
          </Box>
        </div>
      );
    },
  },
  {
    field: "from",
    headerName: "From",
    minWidth: 200,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;
      return (
        <div className="flex flex-col justify-center h-full gap-2">
          <Typography fontSize={14}>From: {shortenHash(rowData.from.hash)}</Typography>
          <div className="inline-flex items-center h-[1.2rem]">
            <Typography fontSize={14}>To:</Typography>
            <ArticleIcon />
            <Typography fontSize={14}>
              {rowData.to.implementations[0] && shortenHash(rowData.to.implementations[0].address)}
            </Typography>
          </div>
        </div>
      );
    },
  },
  {
    field: "value",
    headerName: "Value",
    minWidth: 100,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      function hexToEther(hexValue: string) {
        const weiValue = BigInt(hexValue);
        const etherValue = Number(weiValue) / 10 ** 18;
        return etherValue;
      }

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <Typography fontSize={16}>{hexToEther(rowData.value)} BNB</Typography>
          <Typography fontSize={16}>{rowData.asset}</Typography>
        </div>
      );
    },
  },
];

export const xterioBlkColumns: GridColDef[] = [
  {
    field: "height",
    headerName: "Block",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <ViewInArIcon sx={{ fontSize: "25px" }} />
          <Box>
            <Typography fontSize={16}>{rowData.height}</Typography>
            <Typography className="text-gray-400">
              {xterioGetTimeDifferenceInSeconds(rowData.timestamp)}s ago
            </Typography>
          </Box>
        </div>
      );
    },
  },
  {
    field: "tx_count",
    headerName: "No. Txn",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <Typography fontSize={16}>{rowData.tx_count}</Typography>
        </div>
      );
    },
  },
  {
    field: "gas_used",
    headerName: "Gas Used",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: any }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex gap-2 h-full items-center">
          <Typography fontSize={16}>{rowData.gas_used}</Typography>
        </div>
      );
    },
  },
];
