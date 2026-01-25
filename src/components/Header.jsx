import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
  SvgIcon,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Header({ mode, onToggleMode }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Über mich", href: "#about" },
    { label: "Apps", href: "#apps" },
    { label: "Kontakt", href: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={(t) => ({
          color: t.palette.text.primary,
          backgroundColor:
            t.palette.mode === "dark"
              ? alpha("#0B0D12", 0.65)
              : alpha("#FFFFFF", 0.78),
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${
            t.palette.mode === "dark"
              ? alpha("#fff", 0.12)
              : alpha("#000", 0.08)
          }`,
        })}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {/* 🍎 Apple MUI Icon + Text */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SvgIcon
                viewBox="0 0 384 512"
                sx={{
                  fontSize: 22,
                  color: "text.primary",
                  lineHeight: 1,
                }}
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.5c-.2-45.2 36.9-66.9 38.6-68.1-21-30.6-53.6-34.8-65.2-35.2-27.8-2.8-54.3 16.4-68.4 16.4-14.1 0-36-16-59.2-15.6-30.5.5-58.7 17.7-74.4 45-31.8 55.1-8.1 136.7 22.8 181.4 15.1 21.8 33.1 46.3 56.7 45.4 22.8-.9 31.4-14.7 58.9-14.7 27.5 0 35.3 14.7 59.3 14.2 24.5-.5 40-22.4 55-44.3 17.3-25.3 24.4-49.9 24.7-51.2-.5-.2-47.4-18.2-47.7-72.3zM257.1 114.7c12.6-15.3 21.1-36.6 18.8-57.7-18.1.7-40 12-53 27.3-11.6 13.3-21.8 34.6-19.1 55 20.2 1.6 40.7-10.2 53.3-24.6z"
                />
              </SvgIcon>

              <Typography
                variant="h6"
                sx={{ fontWeight: 900, letterSpacing: -0.3 }}
              >
                iOS Dev
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Desktop Navigation (ab md) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  sx={{ color: "text.primary" }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Theme Toggle bleibt immer sichtbar */}
            <IconButton
              onClick={onToggleMode}
              aria-label="Theme umschalten"
              sx={{ color: "text.primary" }}
            >
              {mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            {/* Mobile Menü Button (nur xs/sm) */}
            <IconButton
              onClick={() => setOpen(true)}
              aria-label="Menü öffnen"
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "text.primary",
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menü */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography sx={{ fontWeight: 900 }}>Menü</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Menü schließen">
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <List disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.href}
                component="a"
                href={item.href}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
