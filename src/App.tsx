import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicLayout } from "./features/auth/components/templates/PublicLayout";
import { Home } from "./features/home/components/templates/Home";
import { PrivateLayout } from "./features/auth/components/templates/PrivateLayout";
import { Auth } from "./features/auth/components/pages/Auth";
import { Dashboard } from "./features/dashboard/components/pages/Dashboard";
import { Quotation } from "./features/quotation/components/pages/Quotation";
import { Tariffs } from "./features/quotation/components/pages/Tariffs";
import { CreateShipment } from "./features/shipments/components/pages/CreateShipment";
import { MyAccount } from "./features/auth/components/pages/MyAccount";
import { ShipmentTracking } from "./features/shipments/components/pages/ShipmentTracking";
import { ErrorBoundary } from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/tracking", element: <ShipmentTracking /> },
      { path: "/tracking/:trackingNumber", element: <ShipmentTracking /> },
      { path: "/shipment/:shipmentId/tracking", element: <ShipmentTracking /> },
      { path: "/tariffs", element: <Tariffs /> },
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
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
