import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { CreateShipmentForm } from '../molecules/CreateShipmentForm';
import { useShipments } from '../../hooks/useShipments';
import { useQuotation } from '../../../quotation/hooks/useQuotation';
import type { CreateShipmentRequestDto, QuotationData } from '../../interfaces/shipment.interface';

export const CreateShipment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createShipment, loading, error, clearError } = useShipments();
  const { tariffs, fetchTariffs } = useQuotation();
  
  const quotationData = location.state?.quotationData as QuotationData | undefined;

  useEffect(() => {
    clearError();
    if (tariffs.length === 0) {
      fetchTariffs();
    }
  }, [clearError, tariffs.length, fetchTariffs]);

  const handleSubmit = async (data: CreateShipmentRequestDto) => {
    try {
      const newShipment = await createShipment(data);
      navigate('/dashboard', { 
        state: { 
          successMessage: `Envío creado exitosamente. Número de seguimiento: ${newShipment.trackingNumber}` 
        } 
      });
    } catch (err) {
      console.error('Error al crear envío:', err);
    }
  };

  if (tariffs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Crear Nuevo Envío
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Completa la información para crear tu envío
        </Typography>
      </Box>

      <CreateShipmentForm 
        quotationData={quotationData}
        tariffs={tariffs}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Container>
  );
}; 