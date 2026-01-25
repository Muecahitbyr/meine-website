import { Box, Paper, Stack, Typography, Chip, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Reveal from "./Reveal.jsx";

function Stat({ label, value }) {
  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        p: 2,
        borderRadius: 4,
        background:
          t.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.03),
        border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
      })}
    >
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 22,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {value}
      </Typography>

      <Typography
        color="text.secondary"
        variant="body2"
        sx={{
          mt: 0.5,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}

function GlassCard({ title, subtitle, children }) {
  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        p: 3,
        borderRadius: 4,
        background:
          t.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha("#fff", 0.07)}, ${alpha("#fff", 0.03)})`
            : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.92)})`,
        border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
        boxShadow:
          t.palette.mode === "dark"
            ? "0 24px 60px rgba(0,0,0,0.35)"
            : "0 24px 60px rgba(0,0,0,0.10)",
        backdropFilter: "blur(10px)",
      })}
    >
      <Typography sx={{ fontWeight: 900, fontSize: 18 }}>{title}</Typography>
      {subtitle ? (
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          {subtitle}
        </Typography>
      ) : null}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Paper>
  );
}

function DeviceMock() {
  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        borderRadius: 2,
        p: 2.5,
        border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
        background:
          t.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
        overflow: "hidden",
      })}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1.3 }}>
        <Typography sx={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.4 }}>
          Dashboard
        </Typography>

        <Paper
          elevation={0}
          sx={(t) => ({
            p: 2,
            borderRadius: 4,
            background: alpha(
              t.palette.primary.main,
              t.palette.mode === "dark" ? 0.12 : 0.08,
            ),
            border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
          })}
        >
          <Typography sx={{ fontWeight: 900 }}>Vehicle Data</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Live Werte • History • Profile
          </Typography>
        </Paper>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.3 }}>
          {["Speed", "Range", "Temp", "Battery"].map((k) => (
            <Paper
              key={k}
              elevation={0}
              sx={(t) => ({
                p: 2,
                borderRadius: 4,
                background:
                  t.palette.mode === "dark"
                    ? alpha("#fff", 0.05)
                    : alpha("#000", 0.02),
                border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
              })}
            >
              <Typography sx={{ fontWeight: 900 }}>{k}</Typography>
              <Typography variant="body2" color="text.secondary">
                {k === "Speed"
                  ? "120 km/h"
                  : k === "Range"
                    ? "410 km"
                    : k === "Temp"
                      ? "92°C"
                      : "86%"}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Paper
          elevation={0}
          sx={(t) => ({
            p: 2,
            borderRadius: 4,
            background:
              t.palette.mode === "dark"
                ? alpha("#fff", 0.05)
                : alpha("#000", 0.02),
            border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
          })}
        >
          <Typography sx={{ fontWeight: 900 }}>Clean UI</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Components • Animations • Accessibility
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
}

export default function About() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
        gap: 3,
        alignItems: "start",
      }}
    >
      {/* LINKS */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal>
          <GlassCard
            title="Profil"
            subtitle="Ich entwickle iOS-Apps mit Swift & SwiftUI – clean, schnell und modern."
          >
            <Typography color="text.secondary">
              Mein Fokus liegt auf sauberer Architektur (z.B. MVVM),
              performanten Apps und einer Benutzeroberfläche, die sich „native“
              anfühlt.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {[
                "Swift",
                "SwiftUI",
                "Xcode",
                "MVVM",
                "Async/Await",
                "REST APIs",
              ].map((t) => (
                <Chip key={t} label={t} variant="outlined" />
              ))}
            </Stack>
          </GlassCard>
        </Reveal>

        <Reveal delay={80} y={22}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Stat label="Fokus" value="iOS & SwiftUI" />
            <Stat label="Stil" value="Clean & Modern" />
          </Box>
        </Reveal>

        <Reveal delay={140} y={22}>
          <GlassCard
            title="Was ich baue"
            subtitle="Typische Features, die ich umsetze"
          >
            <Box sx={{ display: "grid", gap: 1.2 }}>
              {[
                "Moderne SwiftUI Screens (Listen, Cards, Detail Views)",
                "API Integration + Loading/Empty/Error States",
                "State Management, Navigation, Routing",
                "Animationen, Micro-Interactions & Dark Mode",
                "Saubere Struktur, Komponenten & Wiederverwendbarkeit",
              ].map((item) => (
                <Typography key={item} color="text.secondary">
                  • {item}
                </Typography>
              ))}
            </Box>
          </GlassCard>
        </Reveal>
      </Box>

      {/* RECHTS */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal delay={120} y={22}>
          <GlassCard
            title="UI Preview"
            subtitle="Eine kleine Visual-Preview (ohne echtes Foto)"
          >
            <DeviceMock />
          </GlassCard>
        </Reveal>

        <Reveal delay={200} y={22}>
          <GlassCard title="Highlights" subtitle="So arbeite ich">
            <Box sx={{ display: "grid", gap: 1.3 }}>
              <Box>
                <Typography sx={{ fontWeight: 900 }}>1) Planung</Typography>
                <Typography color="text.secondary" variant="body2">
                  Klarer Scope, Screens & Datenflüsse, bevor ich Code schreibe.
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.25 }} />

              <Box>
                <Typography sx={{ fontWeight: 900 }}>2) Umsetzung</Typography>
                <Typography color="text.secondary" variant="body2">
                  Komponenten sauber bauen, UI polishen, Edge-Cases abfangen.
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.25 }} />

              <Box>
                <Typography sx={{ fontWeight: 900 }}>3) Feinschliff</Typography>
                <Typography color="text.secondary" variant="body2">
                  Performance, Accessibility, Details – damit es „fertig“ wirkt.
                </Typography>
              </Box>
            </Box>
          </GlassCard>
        </Reveal>
      </Box>
    </Box>
  );
}
