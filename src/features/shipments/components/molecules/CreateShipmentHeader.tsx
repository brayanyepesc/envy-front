import { Typography, Box } from '@mui/material';
import { Truck } from 'lucide-react';

export const CreateShipmentHeader = () => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Truck size={24} />
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        Crear Nuevo Envío
      </Typography>
    </Box>
  );
}; 