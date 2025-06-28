import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicLayout } from "./features/auth/components/templates/PublicLayout";
import { Home } from "./features/home/components/templates/Home";
import { PrivateLayout } from "./features/auth/components/templates/PrivateLayout";
import { Auth } from "./features/auth/components/pages/Auth";
import { Dashboard } from "./features/dashboard/components/pages/Dashboard";
import { Quotation } from "./features/quotation/components/pages/Quotation";
import { CreateShipment } from "./features/shipments/components/pages/CreateShipment";
import { MyAccount } from "./features/auth/components/pages/MyAccount";

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
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/quotation", element: <Quotation /> },
      { path: "/shipment/create", element: <CreateShipment /> },
      { path: "/my-account", element: <MyAccount /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
