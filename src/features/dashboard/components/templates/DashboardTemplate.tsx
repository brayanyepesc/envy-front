import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Paper
} from '@mui/material';
import { Package, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { StatsCard } from '../molecules/StatsCard';
import { DashboardCharts } from '../organisms/DashboardCharts';
import { ShipmentsTable } from '../organisms/ShipmentsTable';
import { useShipments } from '../../../shipments/hooks/useShipments';

export const DashboardTemplate = () => {
  const { 
    shipments, 
    loading, 
    error, 
    getShipmentsByStatus, 
    getTotalValue
  } = useShipments();

  const shipmentsArray = Array.isArray(shipments) ? shipments : [];
  const waitingShipments = getShipmentsByStatus('waiting');
  const inTransitShipments = getShipmentsByStatus('in_transit');

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dashboard de Envíos
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Resumen completo de tus envíos y estadísticas
        </Typography>
      </Box>

      <Box mb={4}>
        <Box display="flex" gap={3} flexWrap="wrap">
          <Box flex={1} minWidth={250}>
            <StatsCard
              title="Total de Envíos"
              value={shipmentsArray.length}
              icon={Package}
              subtitle="Todos los envíos registrados"
            />
          </Box>
          <Box flex={1} minWidth={250}>
            <StatsCard
              title="Valor Total"
              value={new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(getTotalValue())}
              icon={DollarSign}
              subtitle="Valor acumulado"
            />
          </Box>
          <Box flex={1} minWidth={250}>
            <StatsCard
              title="En Tránsito"
              value={inTransitShipments.length}
              icon={TrendingUp}
              subtitle="Envíos activos"
            />
          </Box>
          <Box flex={1} minWidth={250}>
            <StatsCard
              title="Esperando"
              value={waitingShipments.length}
              icon={Clock}
              subtitle="Pendientes de procesar"
            />
          </Box>
        </Box>
      </Box>

      {shipmentsArray.length > 0 && (
        <Box mb={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Análisis y Estadísticas
            </Typography>
            <DashboardCharts shipments={shipmentsArray} />
          </Paper>
        </Box>
      )}

      <Box>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Envíos Recientes
          </Typography>
          <ShipmentsTable shipments={shipmentsArray.slice(0, 10)} />
        </Paper>
      </Box>
    </Container>
  );
}; 