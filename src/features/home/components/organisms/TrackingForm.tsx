import { useCallback } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { ArrowRight } from "lucide-react";

const TRACKING_NUMBER_MAX_LENGTH = 11;
const TRACKING_NUMBER_PLACEHOLDER = "Ejemplo: 56000000000";

export const TrackingForm = ({
  trackingNumber,
  onTrackingNumberChange,
  onTrack,
  onGenerateGuide,
}: {
  trackingNumber: string;
  onTrackingNumberChange: (value: string) => void;
  onTrack: () => void;
  onGenerateGuide: () => void;
}) => {
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onTrack();
      }
    },
    [onTrack]
  );

  const handleIconAnimation = useCallback(
    (e: React.MouseEvent, translateX: string) => {
      const svg = e.currentTarget.querySelector("svg");
      if (svg) {
        svg.setAttribute(
          "style",
          `transform: translateX(${translateX}); transition: transform 0.2s`
        );
      }
    },
    []
  );

  return (
    <Box width="100%" maxWidth="100%" mx={{ xs: "auto", md: "0" }}>
      <Paper
        elevation={12}
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Rastreo de Guía
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingresa los {TRACKING_NUMBER_MAX_LENGTH} números de tu guía Nacional
            o Internacional.
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            placeholder={TRACKING_NUMBER_PLACEHOLDER}
            value={trackingNumber}
            onChange={(e) => onTrackingNumberChange(e.target.value)}
            onKeyPress={handleKeyPress}
            inputProps={{ maxLength: TRACKING_NUMBER_MAX_LENGTH }}
            variant="outlined"
            size="medium"
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onTrack}
            disabled={!trackingNumber.trim()}
            sx={{
              background: "linear-gradient(to right, #2563eb, #06b6d4)",
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: 3,
              "&:hover": {
                background: "linear-gradient(to right, #1d4ed8, #0891b2)",
              },
              "&:disabled": {
                background: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.38)",
              },
            }}
          >
            Rastrear
          </Button>
        </Box>

        <Box pt={2}>
          <Button
            variant="text"
            size="small"
            onClick={onGenerateGuide}
            sx={{
              color: "#06b6d4",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                color: "#0891b2",
                background: "transparent",
              },
            }}
            endIcon={
              <ArrowRight size={16} style={{ transition: "transform 0.2s" }} />
            }
            onMouseEnter={(e) => handleIconAnimation(e, "4px")}
            onMouseLeave={(e) => handleIconAnimation(e, "0")}
          >
            ¿Quieres generar una guía?
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
