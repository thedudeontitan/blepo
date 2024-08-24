"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useState } from "react";

interface SideNavItem {
  icon: JSX.Element;
  label: string;
}

const sideNav: SideNavItem[] = [
  {
    icon: <HomeIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Home",
  },
  {
    icon: <BarChartIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Statistics",
  },
  {
    icon: <WidgetsIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Dapps",
  },
  {
    icon: <ChecklistIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Compare L2s",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Learn",
  },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: "#141414",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#141414",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  background: "#141414",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PageContainer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Box className="px-[2rem] inline-flex items-center gap-4">
          <Box className="relative w-10 h-10 my-5">
            <Image src="/images/logo_white.png" fill alt="logo" className="object-contain" />
          </Box>
          {open && <Typography sx={{ color: "#ffffff", fontSize: "2.2rem", fontWeight: "bold" }}>Blepo</Typography>}
        </Box>
        <IconButton
          sx={{ color: "#ffffff" }}
          onClick={handleDrawer}
          className="rounded-l-full ml-[1rem] bg-[#8884d8] translate-x-3 z-20 hover:bg-[#8884d8] my-[2rem]"
        >
          {open === true ? <ChevronRightIcon sx={{ mr: "auto" }} /> : <MenuIcon sx={{ fontSize: "1.8rem" }} />}
        </IconButton>
        <Divider />
        <List sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {sideNav.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: open ? 3 : 0,
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                  className="hover:animate-shake duration-1000"
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{ fontWeight: "bold", color: "#ffffff" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className="w-full"> {children}</div>
    </Box>
  );
}
