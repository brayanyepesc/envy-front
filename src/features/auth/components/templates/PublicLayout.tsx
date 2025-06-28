import { Container } from "@mui/material";
import { Outlet } from "react-router";
import { Navbar } from "../organisms/Navbar";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
