import { alpha, createTheme } from "@mui/material/styles";

export function createAppTheme(mode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: isDark ? "#9AE6FF" : "#1565C0" },
      background: {
        default: isDark ? "#0B0D12" : "#F2F4F8",
        paper: isDark ? alpha("#FFFFFF", 0.06) : "#FFFFFF",
      },
    },
    shape: { borderRadius: 18 },
    typography: {
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
      h1: { fontWeight: 900, letterSpacing: -0.8 },
      h2: { fontWeight: 850, letterSpacing: -0.5 },
      h3: { fontWeight: 800 },
      button: { textTransform: "none", fontWeight: 800 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" }, 
          body: {
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(12px)",
            border: `1px solid ${isDark ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
          },
        },
      },
    },
  });
}
