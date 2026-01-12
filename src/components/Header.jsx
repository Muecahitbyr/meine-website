import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function Header({ mode, onToggleMode }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={(t) => ({
        // ✅ wichtig: eigene Farben setzen, nicht AppBar-"primary" etc.
        color: t.palette.text.primary,

        // ✅ Light Mode: nicht reinweiß, sondern leicht grau + Blur
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
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, letterSpacing: -0.3 }}
          >
             iOS Dev
          </Typography>

          <Box sx={{ flex: 1 }} />

          {/* ✅ Buttons bekommen jetzt automatisch die richtige Farbe */}
          <Button href="#about" sx={(t) => ({ color: t.palette.text.primary })}>
            Über mich
          </Button>
          <Button href="#apps" sx={(t) => ({ color: t.palette.text.primary })}>
            Apps
          </Button>
          <Button href="#contact" sx={(t) => ({ color: t.palette.text.primary })}>
            Kontakt
          </Button>

          <IconButton
            onClick={onToggleMode}
            aria-label="Theme umschalten"
            sx={(t) => ({ color: t.palette.text.primary })}
          >
            {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
