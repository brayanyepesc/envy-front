import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(to right, #2563eb, #4f46e5)" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Envy
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Hola, {user?.names}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/auth")}>
            Ingresar
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
