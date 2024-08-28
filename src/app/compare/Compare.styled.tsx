"use client";
import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

export const HeadTableCell = styled(TableCell)(({ theme }) => ({
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "18px",
  display: "inline-flex",
  gap: "10px",
  alignItems: "center",
  width: "100%",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "18px",
  display: "inline-flex",
  gap: "10px",
  alignItems: "center",
  width: "100%",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  "&:last-child td, &:last-child th": { border: 0 },
}));
