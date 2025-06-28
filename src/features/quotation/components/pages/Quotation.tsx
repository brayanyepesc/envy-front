import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Typography, Box, Alert, Button } from '@mui/material';
import { QuotationForm } from '../molecules/QuotationForm';
import { QuotationResult } from '../molecules/QuotationResult';
import { useQuotation } from '../../hooks/useQuotation';
import type { QuotationRequestDto } from '../../interfaces/quotation.interface';

export const Quotation = () => {
  const navigate = useNavigate();
  const { 
    quotation, 
    tariffs, 
    loading, 
    error, 
    getQuotation, 
    fetchTariffs, 
    clearQuotation 
  } = useQuotation();

  useEffect(() => {
    if (tariffs.length === 0) {
      fetchTariffs();
    }
  }, []);

  const handleSubmit = async (data: QuotationRequestDto) => {
    try {
      await getQuotation(data);
    } catch (err) {
      console.error('Error al obtener cotización:', err);
    }
  };

  const handleAcceptQuotation = () => {
    if (quotation) {
      navigate('/shipment/create', { 
        state: { 
          quotationData: {
            origin: quotation.origin,
            destination: quotation.destination,
            weight: quotation.selectedWeight,
            quotedPrice: quotation.price
          }
        } 
      });
    }
  };

  const handleNewQuotation = () => {
    clearQuotation();
  };

  if (loading && tariffs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Cargando tarifas...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Cotización de Envíos
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Calcula el precio de tu envío de forma rápida y transparente
        </Typography>
      </Box>

      {tariffs.length === 0 && !loading && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No hay tarifas disponibles en este momento. Por favor, contacta al administrador.
        </Alert>
      )}

      {quotation ? (
        <Box>
          <QuotationResult 
            quotation={quotation} 
            onAccept={handleAcceptQuotation}
            disabled={false}
          />
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="outlined"
              onClick={handleNewQuotation}
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                '&:hover': {
                  borderColor: '#4f46e5',
                  backgroundColor: 'rgba(37, 99, 235, 0.04)'
                }
              }}
            >
              Realizar nueva cotización
            </Button>
          </Box>
        </Box>
      ) : (
        <QuotationForm 
          tariffs={tariffs}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
    </Container>
  );
}; 