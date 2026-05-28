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
        sx={(theme) => ({
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.primary.main,
            0.22,
          )}, ${alpha(theme.palette.primary.main, 0.12)})`,
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
            <Button
              component={RouterLink}
              to="/"
              disableRipple
              sx={{
                p: 0,
                minWidth: 0,
                color: "rgba(255,255,255,0.94)",
                textTransform: "none",
                fontWeight: 950,
                letterSpacing: -0.3,
                fontSize: "1rem",
                justifyContent: "flex-start",
              }}
            >
              {t("header.brand")}
            </Button>

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
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
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
            </Box>

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
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1.5 }} />
        </Box>
      </Drawer>
    </>
  );
}
