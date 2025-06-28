import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicLayout } from "./features/auth/components/templates/PublicLayout";
import { Home } from "./features/home/components/templates/Home";
import { PrivateLayout } from "./features/auth/components/templates/PrivateLayout";
import { Auth } from "./features/auth/components/pages/Auth";
import { Dashboard } from "./features/dashboard/components/pages/Dashboard";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
