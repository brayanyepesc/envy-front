import {
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import { useState } from "react";

export const RegisterTab = () => {
  const [registerData, setRegisterData] = useState({
    names: "",
    lastnames: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Register data:", registerData);
  };
  return (
    <form onSubmit={handleRegister}>
      <CardContent>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Crear Cuenta
        </Typography>
        <Typography variant="body2" textAlign="center" mb={2}>
          Completa la información para crear tu cuenta
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="👤 Nombres"
            placeholder="Juan"
            value={registerData.names}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                names: e.target.value,
              })
            }
            required
          />
          <TextField
            fullWidth
            label="👤 Apellidos"
            placeholder="Pérez"
            value={registerData.lastnames}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                lastnames: e.target.value,
              })
            }
            required
          />
        </Box>

        <TextField
          fullWidth
          label="📧 Correo Electrónico"
          type="email"
          placeholder="tu@ejemplo.com"
          margin="normal"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              email: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          label="🏙️ Ciudad"
          type="text"
          placeholder="Ciudad"
          margin="normal"
          value={registerData.city}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              city: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="🔒 Contraseña"
          type="password"
          placeholder="••••••••"
          margin="normal"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              password: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          label="🔒 Confirmar Contraseña"
          type="password"
          placeholder="••••••••"
          margin="normal"
          value={registerData.confirmPassword}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
          required
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(to right, #2563eb, #4f46e5)",
          }}
        >
          Crear Cuenta
        </Button>
      </CardActions>
    </form>
  );
};
