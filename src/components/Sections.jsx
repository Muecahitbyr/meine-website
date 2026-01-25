import { Box, Container, Typography } from "@mui/material";

export default function Section({ id, title, subtitle, children }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 } }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1, maxWidth: 720 }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {children}
      </Container>
    </Box>
  );
}
