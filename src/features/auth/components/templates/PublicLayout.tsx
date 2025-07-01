import { Outlet } from "react-router";
import { Navbar } from "../organisms/Navbar";
import { Box } from "@mui/material";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10 }}>
        <Outlet />
      </Box>
    </>
  );
};
