import { Box } from "@mui/material";

export const AnimatedBackground = () => (
  <Box
    position="absolute"
    sx={{
      inset: 0,
      background: "linear-gradient(to right, #2563eb, #4f46e5)",
    }}
  >
    <Box position="absolute" sx={{ inset: 0, opacity: 0.2 }}>
      {[
        { top: "25%", left: "25%", bgcolor: "#3b82f6", delay: "0s" },
        { top: "75%", right: "25%", bgcolor: "#8b5cf6", delay: "1s" },
        { bottom: "25%", left: "33%", bgcolor: "#06b6d4", delay: "0.5s" },
      ].map((blob, index) => (
        <Box
          key={index}
          position="absolute"
          width={288}
          height={288}
          borderRadius="50%"
          bgcolor={blob.bgcolor}
          sx={{
            ...blob,
            mixBlendMode: "multiply",
            filter: "blur(64px)",
            animation: `pulse 2s infinite ${blob.delay}`,
          }}
        />
      ))}
    </Box>
  </Box>
);
