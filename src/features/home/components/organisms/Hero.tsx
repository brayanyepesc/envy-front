import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import { AnimatedBackground } from "../molecules/AnimatedBackground";
import { HeroTitle } from "../molecules/HeroTitle";
import { TrackingForm } from "./TrackingForm";

interface HeroProps {
  onTrack?: (trackingNumber: string) => void;
  onGenerateGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTrack, onGenerateGuide }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const handleTrack = useCallback(() => {
    if (trackingNumber.trim()) {
      onTrack?.(trackingNumber.trim());
      console.log("Rastreando:", trackingNumber);
    }
  }, [trackingNumber, onTrack]);
  const handleGenerateGuide = useCallback(() => {
    onGenerateGuide?.();
  }, [onGenerateGuide]);

  return (
    <Box
      component="section"
      position="relative"
      minHeight="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <AnimatedBackground />
      <Box
        position="relative"
        zIndex={1}
        width="100%"
        mx="auto"
        px={{ xs: 2, sm: 3, md: 4 }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ md: "1fr 1fr" }}
          gap={{ xs: 4, md: 8 }}
          alignItems="center"
        >
          <HeroTitle />
          <TrackingForm
            trackingNumber={trackingNumber}
            onTrackingNumberChange={setTrackingNumber}
            onTrack={handleTrack}
            onGenerateGuide={handleGenerateGuide}
          />
        </Box>
      </Box>
    </Box>
  );
};
