import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Alert,
  Divider
} from '@mui/material';
import { Truck, User } from 'lucide-react';
import { useAuthStore } from '../../../auth/store/auth.store';
import type { CreateShipmentRequestDto, QuotationData } from '../../interfaces/shipment.interface';
import { QuotationService } from '../../../quotation/services/quotation.service';
import { QuotationForm } from '../../../quotation/components/molecules/QuotationForm';
import type { QuotationRequestDto, TariffDto } from '../../../quotation/interfaces/quotation.interface';

interface CreateShipmentFormProps {
  quotationData?: QuotationData;
  tariffs: TariffDto[];
  onSubmit: (data: CreateShipmentRequestDto) => void;
  loading: boolean;
  error: string | null;
}

export const CreateShipmentForm = ({ 
  quotationData, 
  tariffs, 
  onSubmit, 
  loading, 
  error 
}: CreateShipmentFormProps) => {
  const user = useAuthStore(state => state.user);
  const [showQuotation, setShowQuotation] = useState(false);
  const [quotationPrice, setQuotationPrice] = useState<number | null>(null);
  const [quotationLoading, setQuotationLoading] = useState(false);
  const [quotationError, setQuotationError] = useState<string | null>(null);
  const [currentFormData, setCurrentFormData] = useState<QuotationRequestDto | null>(null);

  useEffect(() => {
    if (quotationData) {
      setQuotationPrice(quotationData.quotedPrice);
    }
  }, [quotationData]);

  const handleGetQuotation = async (formData: QuotationRequestDto) => {
    try {
      setQuotationLoading(true);
      setQuotationError(null);
      setCurrentFormData(formData);

      const quotation = await QuotationService.getQuotation(formData);
      setQuotationPrice(quotation.price);
      setShowQuotation(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener cotización';
      setQuotationError(errorMessage);
    } finally {
      setQuotationLoading(false);
    }
  };

  const handleConfirmQuotation = () => {
    if (quotationPrice && currentFormData) {
      const finalData: CreateShipmentRequestDto = {
        origin: currentFormData.origin,
        destination: currentFormData.destination,
        weight: currentFormData.weight,
        length: currentFormData.length,
        width: currentFormData.width,
        height: currentFormData.height,
        quotedPrice: quotationPrice
      };
      onSubmit(finalData);
    }
  };

  const handleCancelQuotation = () => {
    setShowQuotation(false);
    setQuotationPrice(null);
    setQuotationError(null);
    setCurrentFormData(null);
  };

  const handleSubmit = (formData: QuotationRequestDto) => {
    if (quotationData) {
      const shipmentData: CreateShipmentRequestDto = {
        origin: quotationData.origin,
        destination: quotationData.destination,
        weight: quotationData.weight,
        length: quotationData.length,
        width: quotationData.width,
        height: quotationData.height,
        quotedPrice: quotationData.quotedPrice
      };
      onSubmit(shipmentData);
    } else {
      handleGetQuotation(formData);
    }
  };

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
          <Truck size={24} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Crear Nuevo Envío
          </Typography>
        </Box>

        {quotationData && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Cotización aceptada:</strong> {formatPrice(quotationData.quotedPrice)} - 
              {quotationData.origin} → {quotationData.destination}
            </Typography>
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {quotationError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {quotationError}
          </Alert>
        )}

        {showQuotation && quotationPrice && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Cotización obtenida:</strong> {formatPrice(quotationPrice)}
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                size="small"
                onClick={handleConfirmQuotation}
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
                onClick={handleCancelQuotation}
                disabled={loading}
              >
                Cancelar
              </Button>
            </Box>
          </Alert>
        )}

        <QuotationForm
          tariffs={tariffs}
          onSubmit={handleSubmit}
          loading={quotationLoading}
          error={quotationError}
          title={quotationData ? "Información del Envío" : "Datos del Envío"}
          submitButtonText={quotationData ? "Crear Envío" : "Obtener Cotización"}
          showDropdowns={!quotationData}
          initialData={quotationData ? {
            origin: quotationData.origin,
            destination: quotationData.destination,
            weight: quotationData.weight,
            length: quotationData.length,
            width: quotationData.width,
            height: quotationData.height
          } : {
            origin: user?.city || ''
          }}
        />

        <Divider sx={{ my: 3 }} />

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <User size={20} />
          <Typography variant="h6">Información Adicional</Typography>
        </Box>

        <Box sx={{ 
          p: 2, 
          backgroundColor: '#f8f9fa', 
          borderRadius: 1,
          border: '1px solid #e9ecef'
        }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Precio Cotizado:</strong> {quotationPrice ? formatPrice(quotationPrice) : 'Pendiente de cálculo'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {quotationData ? "Precio acordado en la cotización" : "Precio calculado automáticamente"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 