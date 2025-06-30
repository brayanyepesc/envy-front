import { useState } from "react";
import { Box, Tabs, Tab, Card, CardHeader, Button, Container } from "@mui/material";
import { Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { LoginTab } from "../templates/LoginTab";
import { RegisterTab } from "../templates/RegisterTab";

export const Auth = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="linear-gradient(to bottom right, #eff6ff, #e0e7ff)"
    >
      {/* Botón de regreso */}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={20} />}
            onClick={handleGoHome}
            sx={{
              borderColor: 'rgba(37, 99, 235, 0.3)',
              color: '#2563eb',
              '&:hover': {
                borderColor: '#2563eb',
                background: 'rgba(37, 99, 235, 0.05)'
              }
            }}
          >
            Volver al Inicio
          </Button>
        </Box>
      </Container>

      {/* Contenido principal */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={2}
      >
        <Card sx={{ width: "100%", maxWidth: 600, boxShadow: 5 }}>
          <CardHeader
            title={
              <Box display="flex" justifyContent="center" mb={2}>
                <Box
                  width={48}
                  height={48}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  }}
                >
                  <Lock color="white" />
                </Box>
              </Box>
            }
            subheader={
              <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                variant="fullWidth"
              >
                <Tab label="Iniciar Sesión" />
                <Tab label="Registrarse" />
              </Tabs>
            }
          />
          {tab === 0 && <LoginTab />}
          {tab === 1 && <RegisterTab />}
        </Card>
      </Box>
    </Box>
  );
};
