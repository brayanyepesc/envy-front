import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Divider,
  Chip
} from '@mui/material';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Package,
  Truck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TrackingResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface TrackingTimelineProps {
  tracking: TrackingResponseDto;
}

const getStatusIcon = (status: string): LucideIcon => {
  const statusMap: { [key: string]: LucideIcon } = {
    'waiting': Package,
    'processing': Clock,
    'in_transit': Truck,
    'delivered': CheckCircle,
    'cancelled': AlertCircle
  };
  return statusMap[status] || Clock;
};

const getStatusColor = (status: string) => {
  const colorMap: { [key: string]: string } = {
    'waiting': '#ff9800',
    'processing': '#9c27b0',
    'in_transit': '#2196f3',
    'delivered': '#4caf50',
    'cancelled': '#f44336'
  };
  return colorMap[status] || '#757575';
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

const formatDate = (date: Date | string) => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Hace unos minutos';
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else {
    return dateObj.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

export const TrackingTimeline = ({ tracking }: TrackingTimelineProps) => {
  const history = tracking.history || [];
  const currentStatus = tracking.currentStatus;

  return (
    <Box>
      {history.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Package size={48} color="#6b7280" style={{ marginBottom: 16 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No hay historial disponible
          </Typography>
          <Typography variant="body2" color="textSecondary">
            El historial de estados aparecerá aquí cuando el envío comience su proceso.
          </Typography>
        </Box>
      ) : (
        <Box position="relative">
          {/* Línea de tiempo vertical */}
          <Box
            sx={{
              position: 'absolute',
              left: 24,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #2563eb, #4f46e5)',
              borderRadius: 1
            }}
          />

          {history.map((item, index) => {
            const Icon = getStatusIcon(item.status);
            const isCurrentStatus = item.status === currentStatus;

            return (
              <Box key={index} position="relative" mb={3}>
                {/* Punto de la línea de tiempo */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: 8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: isCurrentStatus 
                      ? 'linear-gradient(135deg, #2563eb, #4f46e5)'
                      : getStatusColor(item.status),
                    border: '3px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 2
                  }}
                />

                {/* Contenido del estado */}
                <Box ml={8}>
                  <Card 
                    sx={{ 
                      background: isCurrentStatus 
                        ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                        : 'white',
                      border: isCurrentStatus 
                        ? '2px solid #2563eb'
                        : '1px solid #e5e7eb',
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: isCurrentStatus 
                                ? 'linear-gradient(135deg, #2563eb, #4f46e5)'
                                : `${getStatusColor(item.status)}20`,
                              color: isCurrentStatus ? 'white' : getStatusColor(item.status)
                            }}
                          >
                            <Icon size={20} />
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {getStatusLabel(item.status)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box textAlign="right">
                          <Chip
                            label={isCurrentStatus ? 'Estado Actual' : 'Completado'}
                            color={isCurrentStatus ? 'primary' : 'default'}
                            size="small"
                            variant={isCurrentStatus ? 'filled' : 'outlined'}
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Clock size={16} color="#6b7280" />
                          <Typography variant="body2" color="textSecondary">
                            {formatDate(item.timestamp)}
                          </Typography>
                        </Box>
                        
                        {item.location && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <MapPin size={16} color="#6b7280" />
                            <Typography variant="body2" color="textSecondary">
                              {item.location}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Información adicional para el estado actual */}
                      {isCurrentStatus && (
                        <Box mt={2} p={2} sx={{ background: 'rgba(37, 99, 235, 0.05)', borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#2563eb' }}>
                            📍 Ubicación actual: {item.location || 'En proceso de actualización'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            ⏱️ Última actualización: {formatDate(item.timestamp)}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            );
          })}

          {/* Indicador de envío en progreso */}
          {currentStatus === 'in_transit' && (
            <Box position="relative" ml={8}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                border: '2px dashed #2196f3',
                borderRadius: 2
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Truck size={32} color="#2196f3" style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    🚚 Envío en Movimiento
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tu paquete está siendo transportado hacia su destino
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Mensaje de entrega exitosa */}
          {currentStatus === 'delivered' && (
            <Box position="relative" ml={8}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                border: '2px solid #4caf50',
                borderRadius: 2
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <CheckCircle size={32} color="#4caf50" style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                    ✅ ¡Envío Entregado!
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tu paquete ha sido entregado exitosamente
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}; 