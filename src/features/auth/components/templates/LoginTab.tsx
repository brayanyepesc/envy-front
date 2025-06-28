import {
  CardContent,
  Typography,
  TextField,
  Button,
  CardActions,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export const LoginTab = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData);
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent>
        <Typography variant="h5" textAlign="center" gutterBottom>
          ¡Bienvenido!
        </Typography>
        <Typography variant="body2" textAlign="center" mb={2}>
          Ingresa tus credenciales para acceder a tu cuenta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <TextField
          fullWidth
          label="📧 Correo Electrónico"
          type="email"
          placeholder="tu@ejemplo.com"
          margin="normal"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          disabled={isLoading}
          required
        />
        <TextField
          fullWidth
          label="🔒 Contraseña"
          type="password"
          placeholder="••••••••"
          margin="normal"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
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
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </CardActions>
    </form>
  );
};
