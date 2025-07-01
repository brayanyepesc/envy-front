import { Outlet } from "react-router";
import { Navbar } from "../organisms/Navbar";
import { Container } from "@mui/material";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Outlet />
      </Container>
    </>
  );
};
