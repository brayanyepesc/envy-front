import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Divider
} from '@mui/material';
import { Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TrackingResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface TrackingTimelineProps {
  tracking: TrackingResponseDto;
}

const getStatusIcon = (status: string): LucideIcon => {
  const statusMap: { [key: string]: LucideIcon } = {
    'waiting': Clock,
    'processing': Clock,
    'in_transit': MapPin,
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

export const TrackingTimeline = ({ tracking }: TrackingTimelineProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!tracking.history || tracking.history.length === 0) {
    return (
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Historial de Seguimiento
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center" py={4}>
            <Typography color="textSecondary">
              No hay historial disponible
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Historial de Seguimiento - {tracking.trackingNumber}
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={2}>
          {tracking.history.map((event, index) => {
            const Icon = getStatusIcon(event.status);
            const color = getStatusColor(event.status);
            
            return (
              <Box key={index}>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <Box 
                    sx={{ 
                      backgroundColor: color, 
                      borderRadius: '50%', 
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 0.5
                    }}
                  >
                    <Icon size={16} color="white" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color }}>
                      {event.status.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {event.description}
                    </Typography>
                    {event.location && (
                      <Typography variant="body2" color="textSecondary">
                        📍 {event.location}
                      </Typography>
                    )}
                    <Typography variant="caption" color="textSecondary">
                      {formatDate(event.timestamp)}
                    </Typography>
                  </Box>
                </Box>
                {index < tracking.history.length - 1 && (
                  <Divider sx={{ my: 2, ml: 4 }} />
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}; 