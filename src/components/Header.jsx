import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
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
import useActiveSection from "./useActiveSection.jsx";

export default function Header({ mode, onToggleMode }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation("common");

  const navItems = useMemo(
    () => [
      { id: "about", label: t("header.nav.about"), href: "#about" },
      { id: "tech", label: t("header.nav.tech"), href: "#tech" },
      { id: "apps", label: t("header.nav.apps"), href: "#apps" },
      { id: "contact", label: t("header.nav.contact"), href: "#contact" },
    ],
    [t],
  );

  const active = useActiveSection(navItems.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight || 1) - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={() => ({
          backgroundColor: alpha("#0B0D12", 0.72),
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
        })}
      >
        {/* Progress Bar */}
        <Box
          sx={{
            height: 2,
            width: "100%",
            background: alpha("#fff", 0.06),
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, rgba(154,230,255,0.95), rgba(154,230,255,0.15))",
              boxShadow: "0 0 18px rgba(154,230,255,0.20)",
              transition: "width 120ms linear",
            }}
          />
        </Box>

        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Typography sx={{ fontWeight: 950, letterSpacing: -0.3 }}>
               {t("header.brand")}
            </Typography>

            <Box sx={{ flex: 1 }} />

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <Button
                    key={item.href}
                    href={item.href}
                    sx={{
                      color: "rgba(255,255,255,0.86)",
                      fontWeight: 900,
                      textTransform: "none",
                      borderRadius: 999,
                      px: 1.3,
                      position: "relative",
                      "&:hover": { backgroundColor: alpha("#fff", 0.08) },
                      ...(isActive && {
                        backgroundColor: alpha("#fff", 0.08),
                      }),
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 14,
                        right: 14,
                        bottom: 6,
                        height: 2,
                        borderRadius: 999,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 220ms ease",
                        background:
                          "linear-gradient(90deg, rgba(154,230,255,0.95), rgba(154,230,255,0.15))",
                        boxShadow: isActive
                          ? "0 0 18px rgba(154,230,255,0.25)"
                          : "none",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              <LanguageSelect />
            </Box>

            <IconButton
              onClick={onToggleMode}
              aria-label={t("header.aria.toggleTheme")}
              sx={{ color: "rgba(255,255,255,0.86)" }}
            >
              {mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton
              onClick={() => setOpen(true)}
              aria-label={t("header.aria.openMenu")}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "rgba(255,255,255,0.86)",
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 290, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: 950 }}>
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

          <Divider sx={{ my: 1.5 }} />
          <LanguageSelect size="medium" />
        </Box>
      </Drawer>
    </>
  );
}
