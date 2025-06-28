import { useNavigate } from "react-router";
import { useTokenStore } from "../../store/token.store";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();
  const { token, removeToken } = useTokenStore();
  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(to right, #2563eb, #4f46e5)" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Envy
        </Typography>
        {token ? (
          <>
            <Button
              color="inherit"
              onClick={() => {
                removeToken();
                navigate("/auth");
              }}
            >
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
