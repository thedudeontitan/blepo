"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Collapse, Typography } from "@mui/material";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
interface SideNavItem {
  icon: JSX.Element;
  label: string;
  link?: string;
  submenu?: SideNavItem[];
}

const sideNav: SideNavItem[] = [
  {
    icon: <HomeIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Home",
    link: "/",
  },
  {
    icon: <BarChartIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Statistics",
    submenu: [
      {
        label: "OpBNB",
        link: "/stats/opbnb",
        icon: <Image src="/images/op_bnb.svg" width={30} height={30} alt="opBNB Logo" />,
      },
      {
        label: "Combo",
        link: "/stats/combo",
        icon: <Image src="/images/combo.png" width={30} height={30} alt="opBNB Logo" />,
      },
      {
        label: "Xterio",
        link: "/stats/xterio",
        icon: <Image src="/images/xterio.png" width={30} height={30} alt="opBNB Logo" />,
      },
    ],
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Live Updates",
    link: "/updates",
  },
  {
    icon: <WidgetsIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Dapps",
    link: "/dapps",
  },
  {
    icon: <ChecklistIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Compare L2s",
    link: "/compare",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: "1.8rem" }} />,
    label: "Learn",
    link: "/learn",
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
  const [statsOpen, setStatsOpen] = useState(true);

  const router = useRouter();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const toggleStats = () => {
    setStatsOpen(!statsOpen);
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
        <List sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {sideNav.map((item, index) => (
            <div key={index}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={item.submenu ? toggleStats : () => router.push(item.link!)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      mr: open ? 1 : 0,
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
                  {item.submenu &&
                    open &&
                    (statsOpen ? (
                      <ExpandLessIcon sx={{ fontSize: "1.8rem", color: "#ffffff" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "1.8rem", color: "#ffffff" }} />
                    ))}
                </ListItemButton>
              </ListItem>
              {item.submenu && (
                <Collapse in={statsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {item.submenu.map((subItem, subIndex) => (
                      <ListItemButton key={subIndex} onClick={() => router.push(subItem.link!)}>
                        <ListItemIcon sx={{ color: "#ffffff" }}>{subItem.icon}</ListItemIcon>
                        <ListItemText
                          primary={subItem.label}
                          primaryTypographyProps={{ fontWeight: "bold", color: "#ffffff" }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <div className="w-full">
        <Box
          sx={{
            maxWidth: open === true ? `calc(100vw - 240px - 1rem)` : `calc(100vw - 1rem)`,
          }}
        >
          {children}
        </Box>
      </div>
    </Box>
  );
}
