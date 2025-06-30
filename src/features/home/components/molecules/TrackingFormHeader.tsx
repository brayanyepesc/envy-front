import { Typography, Box } from '@mui/material';
import { Package } from 'lucide-react';

export const TrackingFormHeader = () => {
  return (
    <Box textAlign="center" mb={4}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
          color: 'white',
          mb: 3
        }}
      >
        <Package size={32} />
      </Box>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Rastrea tu Envío
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Ingresa tu número de seguimiento para conocer el estado actual de tu envío en tiempo real
      </Typography>
    </Box>
  );
}; 