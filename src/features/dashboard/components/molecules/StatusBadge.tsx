import { Chip } from '@mui/material';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const getStatusConfig = (status: string) => {
  const statusMap: { [key: string]: { color: string; icon: LucideIcon; label: string } } = {
    'waiting': {
      color: '#ff9800',
      icon: Clock,
      label: 'Esperando'
    },
    'in_transit': {
      color: '#2196f3',
      icon: Truck,
      label: 'En Tránsito'
    },
    'delivered': {
      color: '#4caf50',
      icon: CheckCircle,
      label: 'Entregado'
    },
    'cancelled': {
      color: '#f44336',
      icon: AlertCircle,
      label: 'Cancelado'
    },
    'processing': {
      color: '#9c27b0',
      icon: Package,
      label: 'Procesando'
    }
  };

  return statusMap[status] || {
    color: '#757575',
    icon: Package,
    label: status
  };
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Chip
      icon={<Icon size={16} />}
      label={config.label}
      sx={{
        backgroundColor: config.color,
        color: 'white',
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: 'white'
        }
      }}
    />
  );
}; 