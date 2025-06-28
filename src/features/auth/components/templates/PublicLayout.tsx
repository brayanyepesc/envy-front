import { Container } from "@mui/material";
import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
