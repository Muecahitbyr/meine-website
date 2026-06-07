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
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import useActiveSection from "./useActiveSection.jsx";
import LanguageSelect from "./LanguageSelect.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation("common");

  const navItems = useMemo(
    () => [
      { id: "about", label: t("header.nav.about"), to: "/#about" },
      { id: "tech", label: t("header.nav.tech"), to: "/#tech" },
      { id: "apps", label: t("header.nav.apps"), to: "/#apps" },
      { id: "contact", label: t("header.nav.contact"), to: "/#contact" },
    ],
    [t],
  );

  // Stable reference — prevents useActiveSection effect from reconnecting every render
  const sectionIds = useMemo(() => navItems.map((n) => n.id), [navItems]);
  const active = useActiveSection(sectionIds);

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
        sx={{
          background: "rgba(247,249,249,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {/* Scroll progress bar */}
        <Box sx={{ height: 2, width: "100%", background: "rgba(0,0,0,0.05)" }}>
          <Box
            sx={(theme) => ({
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.4)})`,
              transition: "width 120ms linear",
            })}
          />
        </Box>

        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          >
            {/* Brand logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src="/BayerSolutionsLogo.png"
                alt="BAYAR-SOLUTIONS"
                sx={{ height: 30, width: "auto", objectFit: "contain" }}
              />
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Desktop nav */}
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
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    sx={(theme) => ({
                      color: isActive ? "primary.main" : "text.secondary",
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: "none",
                      borderRadius: 9999,
                      px: 1.5,
                      position: "relative",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.07),
                        color: "text.primary",
                      },
                      ...(isActive && {
                        backgroundColor: alpha(theme.palette.primary.main, 0.07),
                      }),
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 12,
                        right: 12,
                        bottom: 6,
                        height: 2,
                        borderRadius: 999,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 220ms ease",
                        background: theme.palette.primary.main,
                      },
                    })}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Language selector — desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 0.5 }}>
              <LanguageSelect />
            </Box>

            {/* Mobile menu button */}
            <IconButton
              onClick={() => setOpen(true)}
              aria-label={t("header.aria.openMenu")}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "text.secondary",
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>
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
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 1.5 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: 15 }}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1.5 }} />

          {/* Language selector — mobile */}
          <Box sx={{ px: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1, display: "block", fontWeight: 600, letterSpacing: 0.5 }}
            >
              {t("language.label")}
            </Typography>
            <LanguageSelect />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
