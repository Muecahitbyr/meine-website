import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography color="text.secondary" variant="body2">
          © {year} – iOS Developer
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Built with React + MUI
        </Typography>
      </Container>
    </Box>
  );
}
