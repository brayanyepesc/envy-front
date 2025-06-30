import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box,
  MenuItem,
  Alert
} from '@mui/material';
import { Package, MapPin, Calculator } from 'lucide-react';
import { useAuthStore } from '../../../auth/store/auth.store';
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

interface FormData {
  weight: string;
  length: string;
  width: string;
  height: string;
  origin: string;
  destination: string;
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
  const user = useAuthStore(state => state.user);
  const [formData, setFormData] = useState<FormData>({
    weight: '',
    length: '',
    width: '',
    height: '',
    origin: user?.city || '',
    destination: '',
    ...Object.fromEntries(
      Object.entries(initialData).map(([key, value]) => [
        key, 
        typeof value === 'number' ? value.toString() : value || ''
      ])
    )
  });

  const destinations = [...new Set(tariffs.map(tariff => tariff.destination))];
  const availableDestinations = destinations.filter(destination => destination !== formData.origin);

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'origin' && value === prev.destination ? { destination: '' } : {})
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const quotationData: QuotationRequestDto = {
      weight: parseFloat(formData.weight) || 0,
      length: parseFloat(formData.length) || 0,
      width: parseFloat(formData.width) || 0,
      height: parseFloat(formData.height) || 0,
      origin: formData.origin,
      destination: formData.destination
    };
    
    onSubmit(quotationData);
  };

  const isFormValid = () => {
    return parseFloat(formData.weight) > 0 && 
           parseFloat(formData.length) > 0 && 
           parseFloat(formData.width) > 0 && 
           parseFloat(formData.height) > 0 && 
           formData.origin && 
           formData.destination &&
           formData.origin !== formData.destination;
  };

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Calculator size={24} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={3}>
            <Box flex={1} minWidth={{ xs: 'auto', lg: 300 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <MapPin size={20} />
                <Typography variant="h6">Origen y Destino</Typography>
              </Box>
              
              <TextField
                fullWidth
                label="Ciudad de Origen"
                value={formData.origin}
                margin="normal"
                required
                disabled={true}
                helperText="Tu ciudad de origen"
              />

              {showDropdowns ? (
                <TextField
                  select
                  fullWidth
                  label="Ciudad de Destino"
                  value={formData.destination}
                  onChange={handleChange('destination')}
                  margin="normal"
                  required
                  error={formData.origin === formData.destination && formData.destination !== ''}
                  helperText={formData.origin === formData.destination && formData.destination !== '' 
                    ? "La ciudad de destino no puede ser igual a la de origen" 
                    : "Selecciona la ciudad de destino"}
                >
                  {availableDestinations.map((destination) => (
                    <MenuItem key={destination} value={destination}>
                      {destination}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  label="Ciudad de Destino"
                  value={formData.destination}
                  onChange={handleChange('destination')}
                  margin="normal"
                  required
                  error={formData.origin === formData.destination && formData.destination !== ''}
                  helperText={formData.origin === formData.destination && formData.destination !== '' 
                    ? "La ciudad de destino no puede ser igual a la de origen" 
                    : "Ingresa la ciudad de destino"}
                />
              )}
            </Box>

            <Box flex={1} minWidth={{ xs: 'auto', lg: 300 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Package size={20} />
                <Typography variant="h6">Dimensiones del Paquete</Typography>
              </Box>
              
              <TextField
                fullWidth
                label="Peso (kg)"
                type="number"
                value={formData.weight}
                onChange={handleChange('weight')}
                margin="normal"
                required
                inputProps={{ min: 0, step: 0.1 }}
              />

              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  label="Largo (cm)"
                  type="number"
                  value={formData.length}
                  onChange={handleChange('length')}
                  required
                  inputProps={{ min: 0, step: 0.1 }}
                />
                <TextField
                  fullWidth
                  label="Ancho (cm)"
                  type="number"
                  value={formData.width}
                  onChange={handleChange('width')}
                  required
                  inputProps={{ min: 0, step: 0.1 }}
                />
                <TextField
                  fullWidth
                  label="Alto (cm)"
                  type="number"
                  value={formData.height}
                  onChange={handleChange('height')}
                  required
                  inputProps={{ min: 0, step: 0.1 }}
                />
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid() || loading}
              sx={{
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              {loading ? 'Calculando...' : submitButtonText}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}; 