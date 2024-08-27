"use client";

import { Box, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MuiPagination from "@mui/material/Pagination";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { TablePaginationProps } from "@mui/material/TablePagination";
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { Dapps } from "../api/dapps/types";
import { columns } from "./columns";

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      sx={{ "& .MuiPaginationItem-root": { color: "white" } }}
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function Dapps() {
  const [dapps, setDapps] = useState<Dapps[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Dapps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dapps");
        const result = await res.json();
        const dapps = result.res;
        setDapps(dapps);
        setFilteredData(dapps);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentFilter(event.target.value as string);

    const data = dapps.filter((dapp) => dapp.chainName === (event.target.value as string));
    setFilteredData(data);
  };

  const handleClearFilter = () => {
    setFilteredData(dapps);
    setCurrentFilter("");
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-white font-semibold text-3xl">Discover Dapps</h1>
        <div className="flex flex-row text-white items-center gap-4">
          <span className="text-2xl mr-4">Filter:</span>
          <div className="text-white">
            <Select
              variant="standard"
              size="small"
              id="select"
              value={currentFilter}
              label="Chain"
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span className="text-white">Select a chain</span>;
                }
                return selected;
              }}
              sx={{
                color: "#ffffff",
                backgroundColor: "#000000",
                border: "1px solid #ffffff",
                padding: "5px",
                borderRadius: "5px",
                borderColor: "#ffffff",
                "& .MuiSvgIcon-root": {
                  color: "#ffffff",
                },
                "& .MuiSelect-select": {
                  backgroundColor: "#000000",
                },
                width: "200px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#000000",
                    "& .MuiMenuItem-root": {
                      color: "#ffffff",
                      "&.Mui-selected": {
                        backgroundColor: "#333333",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#444444",
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="opBNB">opbnb</MenuItem>
              <MenuItem value="combo">combo</MenuItem>
              <MenuItem value="xterio">xterio</MenuItem>
            </Select>
          </div>
          <Button onClick={handleClearFilter} variant="contained" sx={{ backgroundColor: "#8884d8", color: "#ffffff" }}>
            Clear Filter
          </Button>
        </div>
      </div>
      <div className="w-full mt-4 text-white">
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
            slots={{
              pagination: CustomPagination,
            }}
            rowHeight={100}
            rows={filteredData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </div>
    </div>
  );
}
