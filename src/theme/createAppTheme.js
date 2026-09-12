import { createTheme } from "@mui/material/styles";

export function createAppTheme() {
  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1DB8AA",
        dark: "#169E92",
        light: "#4ECFC3",
        contrastText: "#071815",
      },
      background: {
        // Moderate dark slate, not near-black — a full-black canvas read as
        // too harsh/void-like in review, this keeps depth without the void.
        default: "#12181F",
        paper: "#1A222C",
      },
      text: {
        primary: "#F2F5F4",
        secondary: "#9FA9AE",
        disabled: "#5C666B",
      },
      divider: "rgba(255,255,255,0.10)",
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
          root: { borderColor: "rgba(255,255,255,0.10)" },
        },
      },
    },
  });
}
