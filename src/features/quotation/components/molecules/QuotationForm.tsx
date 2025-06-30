import { 
  Card, 
  CardContent, 
  Box,
  Alert
} from '@mui/material';
import { QuotationFormHeader } from './QuotationFormHeader';
import { QuotationLocationFields } from './QuotationLocationFields';
import { QuotationDimensionsFields } from './QuotationDimensionsFields';
import { QuotationSubmitButton } from './QuotationSubmitButton';
import { useQuotationForm } from '../../hooks/useQuotationForm';
import type { QuotationRequestDto, TariffDto } from '../../interfaces/quotation.interface';

interface QuotationFormProps {
  tariffs: TariffDto[];
  onSubmit: (data: QuotationRequestDto) => void;
  loading: boolean;
  error: string | null;
  title?: string;
  submitButtonText?: string;
  showDropdowns?: boolean;
  initialData?: Partial<QuotationRequestDto>;
}

export const QuotationForm = ({ 
  tariffs, 
  onSubmit, 
  loading, 
  error, 
  title = "Cotización de Envío",
  submitButtonText = "Calcular Cotización",
  showDropdowns = true,
  initialData = {}
}: QuotationFormProps) => {
  const {
    formData,
    availableDestinations,
    handleChange,
    handleSubmit,
    isFormValid,
    getDestinationError
  } = useQuotationForm({ tariffs, onSubmit, initialData });

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <QuotationFormHeader title={title} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={3}>
            <QuotationLocationFields
              origin={formData.origin}
              destination={formData.destination}
              availableDestinations={availableDestinations}
              showDropdowns={showDropdowns}
              onDestinationChange={handleChange('destination')}
              destinationError={getDestinationError()}
            />

            <QuotationDimensionsFields
              weight={formData.weight}
              length={formData.length}
              width={formData.width}
              height={formData.height}
              onWeightChange={handleChange('weight')}
              onLengthChange={handleChange('length')}
              onWidthChange={handleChange('width')}
              onHeightChange={handleChange('height')}
            />
          </Box>

          <QuotationSubmitButton
            loading={loading}
            isValid={isFormValid()}
            submitButtonText={submitButtonText}
          />
        </form>
      </CardContent>
    </Card>
  );
}; 