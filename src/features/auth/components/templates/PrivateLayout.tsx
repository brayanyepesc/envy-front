import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "@mui/material";
import { Navbar } from "../organisms/Navbar";

export const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Outlet />
      </Container>
    </>
  );
};
