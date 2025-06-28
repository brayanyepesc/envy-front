import { Navigate, Outlet } from "react-router";
import { useTokenStore } from "../../store/token.store";
import { Container } from "@mui/material";
import { Navbar } from "../organisms/Navbar";

export const PrivateLayout = () => {
  const { token } = useTokenStore();
  if (!token) return <Navigate to="/auth" />;
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
