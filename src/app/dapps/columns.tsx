"use client";

import { Box, Button, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import type { Dapps } from "../api/dapps/types";

const WebsiteButton = ({ website }: { website: string }) => {
  return (
    <Link href={website} target="_blank">
      <Button className="bg-[#835ea32e] text-[#b0acff] w-fit h-fit truncate px-2 py-1 rounded-md font-medium">
        website
      </Button>
    </Link>
  );
};

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 300,
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: Dapps }) => {
      const rowData = params.row;

      return (
        <div className="flex flex-row items-center h-full">
          <Image src={rowData.logo} alt="logo" width={30} height={30} />
          <Box className="ml-4 gap-2 flex flex-col">
            <Typography className="font-semibold">{rowData.name}</Typography>
            <Box className="inline-flex gap-1">
              {rowData.tags.map((tag, index) => (
                <Typography
                  key={index}
                  className="bg-[#34c38f2e] text-[#34c38f] px-2 py-1 text-[0.7rem] rounded-md font-medium"
                >
                  {tag}
                </Typography>
              ))}
            </Box>
          </Box>
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    headerClassName: "header-color",
  },
  {
    field: "chainName",
    headerName: "Chain Name",
    flex: 1,
    headerClassName: "header-color",
  },
  {
    field: "dailyUsers",
    headerName: "Users",
    flex: 1,
    headerClassName: "header-color",
  },
  {
    field: "dailyTxns",
    headerName: "Transactions",
    flex: 1,
    headerClassName: "header-color",
  },
  {
    field: "website",
    headerName: "Website",
    flex: 1,
    headerClassName: "header-color",
    renderCell: (params: { row: Dapps }) => {
      const rowData = params.row;

      if (!rowData.website) return <div></div>;
      if (rowData.website) {
        return <WebsiteButton website={rowData.website} />;
      }
    },
  },
];
