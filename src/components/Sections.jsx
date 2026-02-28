import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Section({ id, title, subtitle, children }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.45 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [id]);

  return (
    <Box
      component="section"
      id={id}
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "center",
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="lg" sx={{ width: "100%", py: { xs: 7, md: 10 } }}>
        {(title || subtitle) && (
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            {title ? (
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 34, md: 44 },
                  letterSpacing: -0.8,
                  fontWeight: 950,
                }}
              >
                <span className={`sectionTitleUnderline ${on ? "isOn" : ""}`}>
                  {title}
                </span>
              </Typography>
            ) : null}

            {subtitle ? (
              <Typography
                color="text.secondary"
                sx={{ mt: 1, maxWidth: 760, fontSize: 15.5 }}
              >
                {subtitle}
              </Typography>
            ) : null}
          </Box>
        )}

        {children}
      </Container>
    </Box>
  );
}
