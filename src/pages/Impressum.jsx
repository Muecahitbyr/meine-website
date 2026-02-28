import { Box, Container, Typography } from "@mui/material";

export default function Impressum() {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 900 }}>
        Impressum
      </Typography>

      <Typography paragraph>Angaben gemäß § 5 TMG:</Typography>

      <Typography paragraph>
        Mücahit Bayar <br />
        Full-Stack & iOS Entwickler <br />
        87600 Kaufbeuren <br />
        Deutschland
      </Typography>

      <Typography paragraph>
        Kontakt:
        <br />
        E-Mail: mucahitbayar@outlook.de
      </Typography>

      <Typography paragraph>
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
        <br />
        Mücahit Bayar
      </Typography>
    </Container>
  );
}
