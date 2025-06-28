import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Divider,
  Chip
} from '@mui/material';
import { DollarSign, Package, MapPin, Truck } from 'lucide-react';
import type { QuotationResponseDto } from '../../interfaces/quotation.interface';

interface QuotationResultProps {
  quotation: QuotationResponseDto;
  onAccept: () => void;
  disabled?: boolean;
}

export const QuotationResult = ({ quotation, onAccept, disabled = false }: QuotationResultProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <DollarSign size={24} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Resultado de la Cotización
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box>
            <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
              {formatPrice(quotation.price)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Precio total del envío
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={onAccept}
            disabled={disabled}
            sx={{
              background: disabled 
                ? 'rgba(0, 0, 0, 0.12)' 
                : 'linear-gradient(to right, #2563eb, #4f46e5)',
              color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                background: disabled 
                  ? 'rgba(0, 0, 0, 0.12)' 
                  : 'linear-gradient(to right, #1d4ed8, #4338ca)'
              }
            }}
          >
            Aceptar Cotización
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapPin size={20} />
              Ruta del Envío
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip label="Origen" size="small" color="primary" />
              <Typography variant="body1">{quotation.origin}</Typography>
              <Truck size={16} />
              <Chip label="Destino" size="small" color="secondary" />
              <Typography variant="body1">{quotation.destination}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Package size={20} />
              Detalles del Cálculo
            </Typography>
            <Box display="flex" gap={4} flexWrap="wrap">
              <Box>
                <Typography variant="body2" color="textSecondary">Peso Cargado</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {quotation.selectedWeight} kg
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Peso Volumétrico</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {quotation.volumeWeight} kg
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Precio por kg</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatPrice(quotation.pricePerKg)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ backgroundColor: '#f8f9fa', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Información adicional:
            </Typography>
            <Typography variant="body2">
              • El peso cargado se calcula tomando el mayor entre el peso real y el peso volumétrico
            </Typography>
            <Typography variant="body2">
              • El peso volumétrico se calcula como (largo × ancho × alto) ÷ 6000
            </Typography>
            <Typography variant="body2">
              • El precio final incluye todos los costos de transporte y manejo
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 