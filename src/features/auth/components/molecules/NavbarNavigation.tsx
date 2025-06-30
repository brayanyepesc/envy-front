import { 
  BarChart3,
  Calculator,
  Package,
  MapPin,
  DollarSign
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const getNavigationItems = (isAuthenticated: boolean): NavigationItem[] => {
  if (isAuthenticated) {
    return [
      { label: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={18} /> },
      { label: 'Cotización', path: '/quotation', icon: <Calculator size={18} /> },
      { label: 'Crear Envío', path: '/shipment/create', icon: <Package size={18} /> },
      { label: 'Tracking', path: '/tracking', icon: <MapPin size={18} /> },
      { label: 'Tarifas', path: '/tariffs', icon: <DollarSign size={18} /> }
    ];
  }
  
  return [
    { label: 'Tracking', path: '/tracking', icon: <MapPin size={18} /> },
    { label: 'Tarifas', path: '/tariffs', icon: <DollarSign size={18} /> }
  ];
}; 