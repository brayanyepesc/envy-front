import { Typography, Box, Divider } from '@mui/material';
import { User } from 'lucide-react';

export const AdditionalInfoSection = () => {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <User size={20} />
        <Typography variant="h6">Información Adicional</Typography>
      </Box>

      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: 2, 
        p: 3,
        border: '1px solid #e9ecef'
      }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          <strong>Nota:</strong> La información adicional del envío será solicitada por nuestro equipo de atención al cliente.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Una vez creado el envío, recibirás un número de seguimiento y podrás rastrear tu paquete en tiempo real.
        </Typography>
      </Box>
    </>
  );
}; 