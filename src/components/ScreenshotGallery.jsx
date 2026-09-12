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

export default function ScreenshotGallery({ title, screenshots = [], isHovered = false }) {
  const { t } = useTranslation("common");
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  // Preview auto-cycles through the app's screenshots like a little slideshow —
  // stopped while the lightbox is open so it doesn't jump behind the dialog.
  const [previewIdx, setPreviewIdx] = useState(0);

  const hasShots = screenshots.length > 0;
  const fullScreen = useMediaQuery("(max-width:900px)");

  const currentSrc = useMemo(() => screenshots[idx], [screenshots, idx]);

  useEffect(() => {
    if (reduceMotion || open || screenshots.length <= 1) return;
    const id = setInterval(() => {
      setPreviewIdx((v) => (v + 1) % screenshots.length);
    }, 2600);
    return () => clearInterval(id);
  }, [open, screenshots.length, reduceMotion]);

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
          aspectRatio: "9 / 19.5",
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

  return (
    <>
      {/* Preview — phone-frame mockup, auto-cycling through screenshots.
          isHovered from parent card drives the zoom; click opens the lightbox
          at whichever screenshot is currently showing. */}
      <Box
        component="button"
        type="button"
        onClick={() => openAt(previewIdx)}
        aria-label={t("screenshots.openAria", { title })}
        style={{ all: "unset", cursor: "pointer", width: "100%", display: "block" }}
      >
        <MotionBox
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          sx={{
            mt: 2,
            mx: "auto",
            width: "62%",
            maxWidth: 170,
            aspectRatio: "9 / 19.5",
            borderRadius: "22px",
            background: "#0d1116",
            border: "5px solid #1c2229",
            boxShadow: (tt) =>
              tt.palette.mode === "dark"
                ? "0 18px 36px rgba(0,0,0,0.45)"
                : "0 18px 36px rgba(0,0,0,0.16)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Notch */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "42%",
              height: 14,
              background: "#1c2229",
              borderRadius: "0 0 10px 10px",
              zIndex: 2,
            }}
          />
          {/* Crossfading screenshot stack */}
          {screenshots.map((src, i) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt={t("screenshots.previewAlt", { title })}
              loading="lazy"
              decoding="async"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === previewIdx ? 1 : 0,
                transition: "opacity 900ms ease",
              }}
            />
          ))}
        </MotionBox>
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
                width: "min(420px, 90vw)",
                aspectRatio: "9 / 19.5",
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
