import {
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CardActions,
  Alert,
  MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterInput } from "../../interfaces/auth.interface";
import { AVAILABLE_CITIES } from "../../../quotation/interfaces/quotation.interface";

export const RegisterTab = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [registerData, setRegisterData] = useState<RegisterInput>({
    names: "",
    lastnames: "",
    nickname: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(registerData);
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

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
            disabled={isLoading}
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
            disabled={isLoading}
            required
          />
        </Box>

        <TextField
          fullWidth
          label="🎯 Nickname"
          placeholder="juanperez"
          margin="normal"
          value={registerData.nickname}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              nickname: e.target.value,
            })
          }
          disabled={isLoading}
          required
        />

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
          disabled={isLoading}
          required
        />

        <TextField
          select
          fullWidth
          label="🏙️ Ciudad"
          margin="normal"
          value={registerData.city}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              city: e.target.value,
            })
          }
          disabled={isLoading}
          required
        >
          {AVAILABLE_CITIES.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>

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
          disabled={isLoading}
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
          disabled={isLoading}
          required
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{
            background: "linear-gradient(to right, #2563eb, #4f46e5)",
          }}
        >
          {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
        </Button>
      </CardActions>
    </form>
  );
};
