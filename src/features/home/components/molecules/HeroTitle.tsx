import { Box, Typography } from "@mui/material";

export const HeroTitle = () => (
  <Box color="white" textAlign={{ xs: "center", md: "left" }}>
    <Typography
      variant="h2"
      fontWeight="bold"
      gutterBottom
      sx={{
        fontSize: {
          xs: "2.25rem",
          sm: "3rem",
          md: "3.75rem",
          lg: "4.5rem",
        },
        lineHeight: 1.2,
      }}
    >
      El Futuro es{" "}
      <Box
        component="span"
        sx={{
          background: "linear-gradient(to right, #22d3ee, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ahora
      </Box>
    </Typography>
    <Typography variant="h5" fontWeight={300} sx={{ opacity: 0.9 }}>
      ¿Te lo llevamos?
    </Typography>
  </Box>
);
