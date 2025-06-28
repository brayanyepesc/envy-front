import {
  CardContent,
  Typography,
  TextField,
  Button,
  CardActions,
} from "@mui/material";
import { useState } from "react";

export const LoginTab = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", loginData);
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
          Iniciar Sesión
        </Button>
      </CardActions>
    </form>
  );
};
