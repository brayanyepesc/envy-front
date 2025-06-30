import { 
  Card, 
  CardContent, 
  Alert
} from '@mui/material';
import { QuotationForm } from '../../../quotation/components/molecules/QuotationForm';
import { CreateShipmentHeader } from './CreateShipmentHeader';
import { QuotationAlert } from './QuotationAlert';
import { AdditionalInfoSection } from './AdditionalInfoSection';
import { useCreateShipmentForm } from '../../hooks/useCreateShipmentForm';
import type { CreateShipmentRequestDto, QuotationData } from '../../interfaces/shipment.interface';
import type { TariffDto } from '../../../quotation/interfaces/quotation.interface';

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
  const {
    showQuotation,
    quotationPrice,
    quotationLoading,
    quotationError,
    handleSubmit,
    handleConfirmQuotation,
    handleCancelQuotation,
    getInitialData,
    formatPrice
  } = useCreateShipmentForm({ quotationData, onSubmit });

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <CreateShipmentHeader />

        {quotationData && (
          <QuotationAlert
            type="info"
            price={quotationData.quotedPrice}
            origin={quotationData.origin}
            destination={quotationData.destination}
            formatPrice={formatPrice}
          />
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
          <QuotationAlert
            type="success"
            price={quotationPrice}
            origin=""
            destination=""
            onConfirm={handleConfirmQuotation}
            onCancel={handleCancelQuotation}
            loading={loading}
            formatPrice={formatPrice}
          />
        )}

        <QuotationForm
          tariffs={tariffs}
          onSubmit={handleSubmit}
          loading={quotationLoading}
          error={quotationError}
          title={quotationData ? "Información del Envío" : "Datos del Envío"}
          submitButtonText={quotationData ? "Crear Envío" : "Obtener Cotización"}
          showDropdowns={!quotationData}
          initialData={getInitialData()}
        />

        <AdditionalInfoSection />
      </CardContent>
    </Card>
  );
}; 