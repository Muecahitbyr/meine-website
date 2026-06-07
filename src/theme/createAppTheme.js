import { createTheme } from "@mui/material/styles";

export function createAppTheme() {
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1DB8AA",
        dark: "#169E92",
        light: "#4ECFC3",
        contrastText: "#0C1117",
      },
      background: {
        default: "#F7F9F9",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#0C1117",
        secondary: "#4B5563",
        disabled: "#9CA3AF",
      },
      divider: "rgba(0,0,0,0.08)",
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 800, letterSpacing: -1.5 },
      h2: { fontWeight: 800, letterSpacing: -0.8 },
      h3: { fontWeight: 700, letterSpacing: -0.3 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      body1: { fontSize: "0.9375rem", lineHeight: 1.65 },
      body2: { fontSize: "0.8125rem", lineHeight: 1.57 },
      button: { fontWeight: 700, textTransform: "none", letterSpacing: 0 },
      caption: { fontSize: "0.6875rem", lineHeight: 1.5 },
      overline: { fontSize: "0.6875rem", fontWeight: 700, letterSpacing: 1.5 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
            "&:active": { boxShadow: "none" },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6 },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: "rgba(0,0,0,0.08)" },
        },
      },
    },
  });
}
