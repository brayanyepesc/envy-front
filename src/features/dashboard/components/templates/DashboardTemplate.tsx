import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Paper,
  Button
} from '@mui/material';
import { Package, DollarSign, TrendingUp, Clock, Plus, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { StatsCard } from '../molecules/StatsCard';
import { DashboardCharts } from '../organisms/DashboardCharts';
import { ShipmentsTable } from '../organisms/ShipmentsTable';
import { useShipments } from '../../../shipments/hooks/useShipments';

export const DashboardTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { 
    shipments, 
    loading, 
    error, 
    getShipmentsByStatus, 
    getTotalValue,
    fetchShipments
  } = useShipments();

  const shipmentsArray = Array.isArray(shipments) ? shipments : [];
  const waitingShipments = getShipmentsByStatus('waiting');
  const inTransitShipments = getShipmentsByStatus('in_transit');
  const deliveredShipments = getShipmentsByStatus('delivered');

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleCreateShipment = () => {
    navigate('/shipment/create');
  };

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
      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Dashboard de Envíos
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Resumen completo de tus envíos y estadísticas
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={handleCreateShipment}
          sx={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': {
              background: 'linear-gradient(to right, #1d4ed8, #4338ca)'
            }
          }}
        >
          Crear Envío
        </Button>
      </Box>

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
        
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
          <StatsCard
            title="Total de Envíos"
            value={shipmentsArray.length}
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