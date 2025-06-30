import { Box } from "@mui/material";

export const AnimatedBackground = () => (
  <Box
    position="absolute"
    sx={{
      inset: 0,
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
      overflow: "hidden"
    }}
  >
    {/* Gradientes circulares de fondo */}
    <Box position="absolute" sx={{ inset: 0, opacity: 0.6 }}>
      {/* Círculo grande superior izquierdo */}
      <Box
        position="absolute"
        width={400}
        height={400}
        borderRadius="50%"
        sx={{
          top: "-100px",
          left: "-100px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite"
        }}
      />
      
      {/* Círculo mediano superior derecho */}
      <Box
        position="absolute"
        width={300}
        height={300}
        borderRadius="50%"
        sx={{
          top: "50px",
          right: "-50px",
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0.03) 50%, transparent 70%)",
          filter: "blur(30px)",
          animation: "float 8s ease-in-out infinite reverse"
        }}
      />
      
      {/* Círculo pequeño inferior izquierdo */}
      <Box
        position="absolute"
        width={200}
        height={200}
        borderRadius="50%"
        sx={{
          bottom: "100px",
          left: "10%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 70%)",
          filter: "blur(25px)",
          animation: "float 7s ease-in-out infinite"
        }}
      />
      
      {/* Círculo mediano inferior derecho */}
      <Box
        position="absolute"
        width={350}
        height={350}
        borderRadius="50%"
        sx={{
          bottom: "-150px",
          right: "10%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 70%)",
          filter: "blur(35px)",
          animation: "float 9s ease-in-out infinite reverse"
        }}
      />
      
      {/* Círculo pequeño central */}
      <Box
        position="absolute"
        width={150}
        height={150}
        borderRadius="50%"
        sx={{
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0.02) 50%, transparent 70%)",
          filter: "blur(20px)",
          animation: "float 5s ease-in-out infinite"
        }}
      />
    </Box>

    {/* Patrón de puntos sutiles */}
    <Box
      position="absolute"
      sx={{
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(79, 70, 229, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px, 30px 30px",
        backgroundPosition: "0 0, 25px 25px",
        opacity: 0.4
      }}
    />

    {/* Definición de animaciones */}
    <style>
      {`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}
    </style>
  </Box>
);
