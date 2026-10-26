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
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Defined at module level — prevents new component type on each render
const MotionBox = motion(Box);

const EASE = [0.25, 0.46, 0.45, 0.94];

export default function ScreenshotGallery({
  title,
  screenshots = [],
  isHovered = false,
  aspectRatio = "9 / 19.5",
}) {
  const { t } = useTranslation("common");

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const hasShots = screenshots.length > 0;
  const fullScreen = useMediaQuery("(max-width:900px)");

  const currentSrc = useMemo(() => screenshots[idx], [screenshots, idx]);

  // Landscape screenshots (e.g. a desktop web app) need a wider lightbox box
  // than the portrait default (iOS screenshots) — derived from the ratio
  // itself so callers only ever need to pass one prop.
  const isLandscape = useMemo(() => {
    const [w, h] = aspectRatio.split("/").map((n) => parseFloat(n));
    return w > h;
  }, [aspectRatio]);
  const lightboxWidth = isLandscape ? "min(860px, 92vw)" : "min(420px, 90vw)";

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const prev = () =>
    setIdx((v) => (v - 1 + screenshots.length) % screenshots.length);
  const next = () => setIdx((v) => (v + 1) % screenshots.length);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, screenshots.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (screenshots.length > 1) next();
    },
    onSwipedRight: () => {
      if (screenshots.length > 1) prev();
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 10,
  });

  if (!hasShots) {
    return (
      <Box
        sx={{
          mt: 2,
          width: "100%",
          aspectRatio,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: (tt) =>
            tt.palette.mode === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {t("screenshots.placeholder")}
        </Typography>
      </Box>
    );
  }

  const previewSrc = screenshots[0];

  return (
    <>
      {/* Preview image — isHovered from parent card drives the zoom */}
      <Box
        component="button"
        type="button"
        onClick={() => openAt(0)}
        aria-label={t("screenshots.openAria", { title })}
        style={{ all: "unset", cursor: "pointer", width: "100%", display: "block" }}
      >
        {/* Overflow clip — prevents scaled image from spilling outside rounded corners */}
        <Box
          sx={{
            mt: 2,
            overflow: "hidden",
            borderRadius: 4,
            display: "block",
          }}
        >
          <MotionBox
            component="img"
            src={previewSrc}
            alt={t("screenshots.previewAlt", { title })}
            loading="lazy"
            decoding="async"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            sx={{
              width: "100%",
              aspectRatio,
              objectFit: "cover",
              borderRadius: 4,
              border: (tt) =>
                `1px solid ${
                  tt.palette.mode === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.12)"
                }`,
              boxShadow: (tt) =>
                tt.palette.mode === "dark"
                  ? "0 18px 36px rgba(0,0,0,0.38)"
                  : "0 18px 36px rgba(0,0,0,0.14)",
              display: "block",
            }}
          />
        </Box>
      </Box>

      {/* Lightbox */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={fullScreen}
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: (tt) =>
              tt.palette.mode === "dark"
                ? "rgba(10,12,16,0.92)"
                : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderRadius: fullScreen ? 0 : 4,
            // Without this, a tall portrait screenshot forces the Paper
            // taller than the viewport on short windows (laptops) — since
            // the Paper's default max-height leaves no room to shrink, the
            // overflow used to spill past the bottom of the browser window
            // with no way to reach it (body scroll is locked while open).
            maxHeight: fullScreen ? "100%" : "92vh",
            overflowY: "auto",
          },
        }}
      >
        <Box sx={{ position: "relative", p: { xs: 1.5, md: 2 } }}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            {title} — {idx + 1}/{screenshots.length}
          </Typography>

          <IconButton
            onClick={() => setOpen(false)}
            aria-label={t("screenshots.dialogClose")}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {screenshots.length > 1 && (
            <>
              <IconButton
                onClick={prev}
                aria-label={t("screenshots.prev")}
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
                aria-label={t("screenshots.next")}
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

          <Box
            {...swipeHandlers}
            sx={{
              display: "grid",
              placeItems: "center",
              px: { xs: 2, md: 6 },
              pb: 1,
              userSelect: "none",
              touchAction: "pan-y",
            }}
          >
            <Box
              component="img"
              src={currentSrc}
              alt={`${title} Screenshot ${idx + 1}`}
              draggable={false}
              sx={{
                // auto width/height + both max- bounds lets the browser pick
                // whichever constraint (viewport height, on a tall portrait
                // shot, or the lightbox width, on a wide one) is tighter,
                // instead of forcing a fixed width that ignores how tall the
                // window actually is.
                width: "auto",
                height: "auto",
                maxWidth: lightboxWidth,
                maxHeight: { xs: "62vh", md: "72vh" },
                objectFit: "contain",
                borderRadius: 4,
                backgroundColor: (tt) =>
                  tt.palette.mode === "dark"
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
                border: (tt) =>
                  `1px solid ${
                    tt.palette.mode === "dark"
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
