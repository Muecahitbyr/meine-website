import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useSwipeable } from "react-swipeable";

export default function ScreenshotGallery({ title, screenshots = [] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const hasShots = screenshots.length > 0;
  const fullScreen = useMediaQuery("(max-width:900px)");

  const currentSrc = useMemo(() => screenshots[idx], [screenshots, idx]);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const prev = () =>
    setIdx((v) => (v - 1 + screenshots.length) % screenshots.length);
  const next = () => setIdx((v) => (v + 1) % screenshots.length);

  // ✅ Optional: Keyboard Support (←/→/Esc)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, screenshots.length]);

  // ✅ Swipe Handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (screenshots.length > 1) next();
    },
    onSwipedRight: () => {
      if (screenshots.length > 1) prev();
    },
    trackMouse: true, // auch mit Maus ziehen am Desktop möglich
    preventScrollOnSwipe: true,
    delta: 10, // wie empfindlich
  });

  // Fallback wenn keine Screenshots vorhanden
  if (!hasShots) {
    return (
      <Box
        sx={{
          mt: 2,
          width: "100%",
          aspectRatio: "9 / 19.5",
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: (t) =>
            t.palette.mode === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          iOS Screenshot Platzhalter
        </Typography>
      </Box>
    );
  }

  // ✅ In der Card nur 1 Bild zeigen (wie du wolltest)
  const previewSrc = screenshots[0];

  return (
    <>
      {/* Preview Bild */}
      <Box
        component="button"
        type="button"
        onClick={() => openAt(0)}
        aria-label={`${title} Screenshots öffnen`}
        style={{ all: "unset", cursor: "pointer", width: "100%" }}
      >
        <Box
          component="img"
          src={previewSrc}
          alt={`${title} Screenshot Vorschau`}
          sx={{
            mt: 2,
            width: "100%",
            aspectRatio: "9 / 19.5",
            objectFit: "cover",
            borderRadius: 4,
            border: (t) =>
              `1px solid ${
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.12)"
              }`,
            boxShadow: (t) =>
              t.palette.mode === "dark"
                ? "0 18px 36px rgba(0,0,0,0.38)"
                : "0 18px 36px rgba(0,0,0,0.14)",
            transition: "transform 200ms ease, opacity 200ms ease",
            "&:hover": { transform: "translateY(-2px)", opacity: 0.98 },
          }}
        />
      </Box>

      {/* Lightbox */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={fullScreen}
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(10,12,16,0.92)"
                : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderRadius: fullScreen ? 0 : 4,
          },
        }}
      >
        <Box sx={{ position: "relative", p: { xs: 1.5, md: 2 } }}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            {title} — {idx + 1}/{screenshots.length}
          </Typography>

          <IconButton
            onClick={() => setOpen(false)}
            aria-label="Schließen"
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {screenshots.length > 1 && (
            <>
              <IconButton
                onClick={prev}
                aria-label="Vorheriges Bild"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>

              <IconButton
                onClick={next}
                aria-label="Nächstes Bild"
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </>
          )}

          {/* ✅ Swipe-Zone (um das Bild) */}
          <Box
            {...swipeHandlers}
            sx={{
              display: "grid",
              placeItems: "center",
              px: { xs: 2, md: 6 },
              pb: 1,
              userSelect: "none",
              touchAction: "pan-y", // vertikales Scrollen bleibt möglich
            }}
          >
            <Box
              component="img"
              src={currentSrc}
              alt={`${title} Screenshot ${idx + 1}`}
              draggable={false}
              sx={{
                width: "min(420px, 90vw)",
                aspectRatio: "9 / 19.5",
                objectFit: "contain",
                borderRadius: 4,
                backgroundColor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
                border: (t) =>
                  `1px solid 
                    t.palette.mode === "dark"
                      ? "rgba(255,255,255,0.14)"
                      : "rgba(0,0,0,0.12)"
                  }`,
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
