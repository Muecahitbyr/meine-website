import { useMemo, useState } from "react";
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
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import useActiveSection from "./useActiveSection.jsx";

const MotionBox = motion(Box);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Progress bar width is a motion value updated directly on the DOM — no
  // React re-render per scroll pixel. Only crossing the "scrolled" threshold
  // triggers an actual re-render (React bails out when the value is unchanged),
  // which is what keeps scrolling smooth on lower-end mobile devices.
  const { scrollY, scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 4);
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        style={{
          background: scrolled
            ? "rgba(247,249,249,0.97)"
            : "rgba(247,249,249,0.88)",
          backdropFilter: scrolled
            ? "blur(22px) saturate(190%)"
            : "blur(12px) saturate(150%)",
          WebkitBackdropFilter: scrolled
            ? "blur(22px) saturate(190%)"
            : "blur(12px) saturate(150%)",
          boxShadow: scrolled
            ? "0 1px 28px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)"
            : "none",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          transition:
            "background 350ms ease, backdrop-filter 350ms ease, -webkit-backdrop-filter 350ms ease, box-shadow 350ms ease",
        }}
      >
        {/* Scroll progress bar — motion value drives width directly, no re-render */}
        <Box sx={{ height: 2, width: "100%", background: "rgba(0,0,0,0.05)" }}>
          <MotionBox
            style={{ width: progressWidth }}
            sx={(theme) => ({
              height: "100%",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.4)})`,
            })}
          />
        </Box>

        <Toolbar disableGutters sx={{ minHeight: { xs: 88, md: 104 } }}>
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
                src="/BayerSolutionsLogo.webp"
                alt="BAYAR-SOLUTIONS"
                sx={{ height: { xs: 60, md: 78 }, width: "auto", objectFit: "contain" }}
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
        </Box>
      </Drawer>
    </>
  );
}
