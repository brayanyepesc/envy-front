import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicLayout } from "./features/auth/components/templates/PublicLayout";
import { Home } from "./features/home/components/templates/Home";
import { PrivateLayout } from "./features/auth/components/templates/PrivateLayout";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    element: <PrivateLayout />,
    children: [],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
