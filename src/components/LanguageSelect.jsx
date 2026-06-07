import { Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { setLanguage } from "../i18n/config";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const current = i18n.language || "de";

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
              color: isActive
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.55)",
              backgroundColor: isActive
                ? alpha("#fff", 0.14)
                : "transparent",
              "&:hover": {
                backgroundColor: alpha("#fff", 0.10),
                color: "rgba(255,255,255,0.85)",
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
