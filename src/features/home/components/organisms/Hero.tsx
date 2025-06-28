import React from "react";
import { Box } from "@mui/material";
import { AnimatedBackground } from "../molecules/AnimatedBackground";
import { HeroTitle } from "../molecules/HeroTitle";
import { TrackingForm } from "./TrackingForm";

export const Hero: React.FC = () => {
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
          <TrackingForm />
        </Box>
      </Box>
    </Box>
  );
};
