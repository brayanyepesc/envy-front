import { useState } from "react";
import { Box, Tabs, Tab, Card, CardHeader } from "@mui/material";
import { Lock } from "lucide-react";
import { LoginTab } from "../templates/LoginTab";
import { RegisterTab } from "../templates/RegisterTab";

export const Auth = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box
      minHeight="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="linear-gradient(to bottom right, #eff6ff, #e0e7ff)"
      marginTop={10}
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
  );
};
