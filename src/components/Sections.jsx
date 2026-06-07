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
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [id]);

  return (
    <Box component="section" id={id}>
      <Container maxWidth="lg" sx={{ width: "100%", py: { xs: 8, md: 12 } }}>
        {(title || subtitle) && (
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            {title ? (
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 32, md: 44 },
                  letterSpacing: -0.8,
                  fontWeight: 800,
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
                sx={{
                  mt: 1.5,
                  maxWidth: 600,
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: 1.65,
                }}
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
