"use client";

import { Button } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const WebsiteButton = ({ stats, website }: { stats: string; website: string }) => {
  const router = useRouter();
  return (
    <div className="inline-flex items-center gap-4">
      <Button
        onClick={() => router.push(stats)}
        className="bg-[#8884d82e] text-[#8884d8] w-fit h-fit truncate px-2 py-1 rounded-md font-medium"
      >
        Stats
      </Button>
      <Link href={website} target="_blank">
        <Button className="bg-[#8884d82e] text-[#8884d8] w-fit h-fit truncate px-2 py-1 rounded-md font-medium">
          website
        </Button>
      </Link>
    </div>
  );
};

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
  {
    field: "website",
    headerName: "Website",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: Row }) => {
      const rowData = params.row;

      if (rowData.name === "opBNB") {
        return <WebsiteButton website="https://opbnb.bnbchain.org/en" stats="/stats/opbnb" />;
      } else if (rowData.name === "Combo") {
        return <WebsiteButton website="https://combonetwork.io/" stats="/stats/combo" />;
      } else if (rowData.name === "Xterio") {
        return <WebsiteButton website="https://xter.io/" stats="/stats/xterio" />;
      }
    },
  },
];
