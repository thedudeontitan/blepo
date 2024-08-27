"use client";

import type { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";

export interface Row {
  id: number;
  logo: string;
  name: string;
  tvl: string;
  active_address: number;
  type: string;
}

export const rows: Row[] = [
  {
    id: 1,
    logo: "/images/op_bnb.svg",
    name: "opBNB",
    tvl: "100",
    active_address: 1000,
    type: "Optimistic Rollup",
  },
  {
    id: 2,
    logo: "/images/combo.png",
    name: "Combo",
    tvl: "coming soon",
    active_address: 2000,
    type: "Optimistic Rollup",
  },
  {
    id: 3,
    logo: "/images/xterio.png",
    name: "Xterio",
    tvl: "coming soon",
    active_address: 3000,
    type: "Optimistic Rollup",
  },
];

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: Row }) => {
      const rowData = params.row;

      return (
        <div className="inline-flex items-center">
          <Image src={rowData.logo} alt="logo" width={30} height={30} />
          <h3 className="ml-2 font-semibold">{rowData.name}</h3>
        </div>
      );
    },
  },
  {
    field: "tvl",
    headerName: "TVL",
    flex: 1,
    headerClassName: "header-color",
  },
  {
    field: "active_address",
    headerName: "Active Address",
    flex: 1,
    headerClassName: "header-color",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: Row }) => {
      const rowData = params.row;

      return (
        <span className="bg-[#34c38f2e] text-[#34c38f] px-2 py-1 text-[1rem] rounded-md font-medium">
          {rowData.type}
        </span>
      );
    },
  },
];
