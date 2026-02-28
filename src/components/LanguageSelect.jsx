import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import i18n from "i18next";
import { setLanguage } from "../i18n/config";
import { useTranslation } from "react-i18next";

export default function LanguageSelect({ size = "small" }) {
  const { t } = useTranslation("common");

  return (
    <FormControl size={size} sx={{ minWidth: 150 }}>
      <InputLabel>
        {t("language.label", { defaultValue: "Language" })}
      </InputLabel>
      <Select
        label={t("language.label", { defaultValue: "Language" })}
        value={i18n.language || "de"}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="tr">Türkçe</MenuItem>
      </Select>
    </FormControl>
  );
}
