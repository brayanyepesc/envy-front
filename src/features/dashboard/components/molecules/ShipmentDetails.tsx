import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider,
  Chip
} from '@mui/material';
import { MapPin, Package, Calendar } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface ShipmentDetailsProps {
  shipment: ShipmentDetailsResponseDto;
}

export const ShipmentDetails = ({ shipment }: ShipmentDetailsProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(numericPrice);
  };

  const calculateVolume = () => {
    const { length, width, height } = shipment.package;
    const l = parseFloat(String(length));
    const w = parseFloat(String(width));
    const h = parseFloat(String(height));
    return (l * w * h).toFixed(2);
  };

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Envío #{shipment.trackingNumber}
            </Typography>
            <StatusBadge status={shipment.status} />
          </Box>
          <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            {formatPrice(String(shipment.quotedPrice))}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapPin size={20} />
              Ruta del Envío
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip label="Origen" size="small" color="primary" />
                <Typography variant="body1">{shipment.origin}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip label="Destino" size="small" color="secondary" />
                <Typography variant="body1">{shipment.destination}</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Package size={20} />
              Detalles del Paquete
            </Typography>
            <Box display="flex" gap={4} flexWrap="wrap">
              <Box>
                <Typography variant="body2" color="textSecondary">Peso</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {shipment.package.weight} kg
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Dimensiones</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {shipment.package.length} × {shipment.package.width} × {shipment.package.height} cm
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Volumen</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {calculateVolume()} cm³
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Calendar size={20} />
              Información Temporal
            </Typography>
            <Box display="flex" gap={4} flexWrap="wrap">
              <Box>
                <Typography variant="body2" color="textSecondary">Creado</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatDate(String(shipment.createdAt))}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Actualizado</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatDate(String(shipment.updatedAt))}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 