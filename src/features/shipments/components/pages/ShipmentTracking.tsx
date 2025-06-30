import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress,
  Chip,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Search, 
  RefreshCw, 
  MapPin, 
  Truck, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import { useParams } from 'react-router';
import { useTracking } from '../../hooks/useTracking';
import { TrackingTimeline } from '../../../dashboard/components/molecules/TrackingTimeline';
import { TrackingNotification } from '../molecules/TrackingNotification';

export const ShipmentTracking = () => {
  const { trackingNumber: urlTrackingNumber, shipmentId: urlShipmentId } = useParams();
  const [searchTrackingNumber, setSearchTrackingNumber] = useState(urlTrackingNumber || '');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [previousStatus, setPreviousStatus] = useState<string | undefined>();
  const [showNotification, setShowNotification] = useState(false);

  const {
    trackingData,
    loading,
    error,
    lastUpdate,
    refresh,
    startAutoRefresh,
    stopAutoRefresh,
    getCurrentStatus,
    isInTransit,
    isDelivered,
    isWaiting,
    getTimeSinceLastUpdate,
    clearError
  } = useTracking({
    trackingNumber: searchTrackingNumber || undefined,
    shipmentId: urlShipmentId ? parseInt(urlShipmentId) : undefined,
    autoRefresh,
    refreshInterval: 30000 // 30 segundos
  });

  // Efecto para detectar cambios de estado y mostrar notificaciones
  useEffect(() => {
    if (trackingData && previousStatus && previousStatus !== getCurrentStatus()) {
      setShowNotification(true);
    }
    if (trackingData) {
      setPreviousStatus(getCurrentStatus());
    }
  }, [trackingData, getCurrentStatus, previousStatus]);

  const handleSearch = () => {
    if (searchTrackingNumber.trim()) {
      clearError();
      refresh();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    if (autoRefresh) {
      stopAutoRefresh();
    } else {
      startAutoRefresh();
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const getStatusIcon = () => {
    const status = getCurrentStatus();
    switch (status) {
      case 'waiting':
        return <Clock size={24} color="#ff9800" />;
      case 'processing':
        return <Clock size={24} color="#9c27b0" />;
      case 'in_transit':
        return <Truck size={24} color="#2196f3" />;
      case 'delivered':
        return <CheckCircle size={24} color="#4caf50" />;
      case 'cancelled':
        return <AlertTriangle size={24} color="#f44336" />;
      default:
        return <Clock size={24} color="#757575" />;
    }
  };

  const getStatusColor = () => {
    const status = getCurrentStatus();
    switch (status) {
      case 'waiting':
        return '#ff9800';
      case 'processing':
        return '#9c27b0';
      case 'in_transit':
        return '#2196f3';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'waiting': 'En Espera',
      'processing': 'Procesando',
      'in_transit': 'En Tránsito',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return labels[status] || status;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Seguimiento de Envío
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Rastrea tu envío en tiempo real y conoce su ubicación actual
        </Typography>
      </Box>

      {/* Search Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <TextField
            fullWidth
            label="Número de Seguimiento"
            value={searchTrackingNumber}
            onChange={(e) => setSearchTrackingNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ejemplo: 56000000000"
            sx={{ flex: 1, minWidth: { xs: 'auto', sm: 300 } }}
          />
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Search size={20} />}
              onClick={handleSearch}
              disabled={!searchTrackingNumber.trim() || loading}
              sx={{
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                color: 'white',
                px: { xs: 2, sm: 3 },
                '&:hover': {
                  background: 'linear-gradient(to right, #1d4ed8, #4338ca)'
                }
              }}
            >
              Buscar
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshCw size={20} />}
              onClick={refresh}
              disabled={loading}
            >
              Actualizar
            </Button>
          </Box>
        </Box>

        <Box mt={2} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={toggleAutoRefresh}
                color="primary"
              />
            }
            label="Actualización automática"
          />
          <Chip
            icon={autoRefresh ? <Play size={16} /> : <Pause size={16} />}
            label={autoRefresh ? 'Activo' : 'Pausado'}
            color={autoRefresh ? 'success' : 'default'}
            size="small"
          />
          {lastUpdate && (
            <Typography variant="body2" color="textSecondary">
              Última actualización: {getTimeSinceLastUpdate()}
            </Typography>
          )}
        </Box>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Tracking Results */}
      {trackingData && !loading && (
        <Box>
          {/* Current Status Card */}
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" mb={3} gap={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  {getStatusIcon()}
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: getStatusColor(), fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                      {getStatusLabel(getCurrentStatus())}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Estado actual del envío
                    </Typography>
                  </Box>
                </Box>
                <Box textAlign={{ xs: 'left', md: 'right' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    #{trackingData.trackingNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Número de seguimiento
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Status Indicators */}
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(4, 1fr)' }} gap={3}>
                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: isWaiting() ? 'linear-gradient(to right, #2563eb, #4f46e5)' : '#e5e7eb',
                      color: isWaiting() ? 'white' : '#6b7280',
                      mb: 2
                    }}
                  >
                    <Clock size={24} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    En Espera
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: isInTransit() ? 'linear-gradient(to right, #2563eb, #4f46e5)' : '#e5e7eb',
                      color: isInTransit() ? 'white' : '#6b7280',
                      mb: 2
                    }}
                  >
                    <Truck size={24} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    En Tránsito
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: isDelivered() ? 'linear-gradient(to right, #2563eb, #4f46e5)' : '#e5e7eb',
                      color: isDelivered() ? 'white' : '#6b7280',
                      mb: 2
                    }}
                  >
                    <CheckCircle size={24} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Entregado
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: '#e5e7eb',
                      color: '#6b7280',
                      mb: 2
                    }}
                  >
                    <MapPin size={24} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Ubicación
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Timeline Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Historial de Estados
              </Typography>
              <TrackingTimeline tracking={trackingData} />
            </CardContent>
          </Card>
        </Box>
      )}

      {/* No Results */}
      {!trackingData && !loading && !error && searchTrackingNumber && (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No se encontró información para este número de seguimiento
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Verifica que el número sea correcto o contacta soporte si necesitas ayuda.
          </Typography>
        </Card>
      )}

      {/* Notification */}
      {showNotification && trackingData && (
        <TrackingNotification
          open={showNotification}
          onClose={handleNotificationClose}
          currentStatus={getCurrentStatus()}
          previousStatus={previousStatus}
          trackingNumber={trackingData.trackingNumber}
        />
      )}
    </Container>
  );
}; 