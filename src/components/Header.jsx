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
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect.jsx";

export default function Header({ mode, onToggleMode }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");

  const navItems = [
    { label: t("header.nav.about"), href: "#about" },
    { label: t("header.nav.apps"), href: "#apps" },
    { label: t("header.nav.contact"), href: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={(tt) => ({
          color: tt.palette.text.primary,
          backgroundColor:
            tt.palette.mode === "dark"
              ? alpha("#0B0D12", 0.65)
              : alpha("#FFFFFF", 0.78),
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${
            tt.palette.mode === "dark"
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
            {/* 🍎 Icon + Brand */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SvgIcon
                viewBox="0 0 384 512"
                sx={{ fontSize: 22, color: "text.primary", lineHeight: 1 }}
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
                {t("header.brand")}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Desktop Nav + Language Dropdown */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  sx={{ color: "text.primary" }}
                >
                  {item.label}
                </Button>
              ))}

              {/* 🌍 Language Dropdown */}
              <LanguageSelect />
            </Box>

            {/* Theme Toggle */}
            <IconButton
              onClick={onToggleMode}
              aria-label={t("header.aria.toggleTheme")}
              sx={{ color: "text.primary" }}
            >
              {mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={() => setOpen(true)}
              aria-label={t("header.aria.openMenu")}
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

      {/* Mobile Drawer */}
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
            <Typography sx={{ fontWeight: 900 }}>
              {t("header.mobileMenuTitle")}
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              aria-label={t("header.aria.closeMenu")}
            >
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

          {/* 🌍 Language Dropdown im Mobile Drawer */}
          <Divider sx={{ my: 1.5 }} />
          <LanguageSelect size="medium" />
        </Box>
      </Drawer>
    </>
  );
}
