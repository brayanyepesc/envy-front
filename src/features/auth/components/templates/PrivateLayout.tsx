import { Navigate, Outlet } from "react-router";
import { useTokenStore } from "../../store/token.store";
import { Container } from "@mui/material";

export const PrivateLayout = () => {
  const { token } = useTokenStore();
  if (!token) return <Navigate to="/auth/login" />;
  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
