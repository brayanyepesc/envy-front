import { Box } from '@mui/material';
import { Package, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ResponsiveGrid } from '../../../../components/common';

interface DashboardStatsProps {
  shipments: any[];
  getShipmentsByStatus: (status: string) => any[];
  getTotalValue: () => number;
}

export const DashboardStats = ({ 
  shipments, 
  getShipmentsByStatus, 
  getTotalValue 
}: DashboardStatsProps) => {
  const waitingShipments = getShipmentsByStatus('waiting');
  const inTransitShipments = getShipmentsByStatus('in_transit');
  const deliveredShipments = getShipmentsByStatus('delivered');

  return (
    <Box mb={4}>
      <Box mb={3}>
        <StatsCard
          title="Valor Total"
          value={new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          }).format(getTotalValue())}
          icon={DollarSign}
          subtitle="Valor acumulado de todos los envíos"
          sx={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            '& .MuiTypography-root': {
              color: 'white'
            },
            '& .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        />
      </Box>
      
      <ResponsiveGrid columns={{ xs: 2, md: 4 }} gap={{ xs: 2, md: 3 }}>
        <StatsCard
          title="Total de Envíos"
          value={shipments.length}
          icon={Package}
          subtitle="Todos los envíos registrados"
        />
        <StatsCard
          title="En Tránsito"
          value={inTransitShipments.length}
          icon={TrendingUp}
          subtitle="Envíos activos"
        />
        <StatsCard
          title="Esperando"
          value={waitingShipments.length}
          icon={Clock}
          subtitle="Pendientes de procesar"
        />
        <StatsCard
          title="Entregados"
          value={deliveredShipments.length}
          icon={CheckCircle}
          subtitle="Envíos completados"
        />
      </ResponsiveGrid>
    </Box>
  );
}; 