import { Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { setLanguage } from "../i18n/config";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

/**
 * mode="overlay"  — used inside frosted-glass header (white text on teal)
 * mode="surface"  — used inside light drawers/panels (standard text colors)
 */
export default function LanguageSelect({ mode = "surface" }) {
  const { i18n } = useTranslation();
  const current = i18n.language || "de";
  const isOverlay = mode === "overlay";

  return (
    <Stack direction="row" spacing={0.25}>
      {LANGUAGES.map(({ code, label }) => {
        const isActive = current.startsWith(code);
        return (
          <Button
            key={code}
            onClick={() => setLanguage(code)}
            disableRipple
            sx={(theme) => ({
              minWidth: 0,
              px: 1.25,
              py: 0.5,
              fontSize: 12,
              fontWeight: isActive ? 700 : 500,
              lineHeight: 1,
              borderRadius: 9999,
              color: isOverlay
                ? isActive
                  ? "rgba(255,255,255,0.96)"
                  : "rgba(255,255,255,0.55)"
                : isActive
                  ? "primary.main"
                  : "text.secondary",
              backgroundColor: isActive
                ? isOverlay
                  ? alpha("#fff", 0.14)
                  : alpha(theme.palette.primary.main, 0.10)
                : "transparent",
              "&:hover": {
                backgroundColor: isOverlay
                  ? alpha("#fff", 0.10)
                  : alpha(theme.palette.primary.main, 0.07),
              },
            })}
          >
            {label}
          </Button>
        );
      })}
    </Stack>
  );
}
