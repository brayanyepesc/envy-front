import { Alert, Typography, Box, Button } from '@mui/material';

interface QuotationAlertProps {
  type: 'info' | 'success';
  price: number;
  origin: string;
  destination: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  formatPrice: (price: number) => string;
}

export const QuotationAlert = ({
  type,
  price,
  origin,
  destination,
  onConfirm,
  onCancel,
  loading = false,
  formatPrice
}: QuotationAlertProps) => {
  if (type === 'info') {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Cotización aceptada:</strong> {formatPrice(price)} - 
          {origin} → {destination}
        </Typography>
      </Alert>
    );
  }

  return (
    <Alert severity="success" sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 2 }}>
        <strong>Cotización obtenida:</strong> {formatPrice(price)}
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          size="small"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(to right, #1d4ed8, #4338ca)'
            }
          }}
        >
          Aceptar y Crear Envío
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
      </Box>
    </Alert>
  );
}; 