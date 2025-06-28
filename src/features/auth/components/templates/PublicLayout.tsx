import { Outlet } from "react-router";
import { Navbar } from "../organisms/Navbar";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
