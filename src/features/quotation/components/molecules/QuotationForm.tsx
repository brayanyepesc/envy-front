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
import type { QuotationRequestDto, TariffDto } from '../../interfaces/quotation.interface';

interface QuotationFormProps {
  tariffs: TariffDto[];
  onSubmit: (data: QuotationRequestDto) => void;
  loading: boolean;
  error: string | null;
}

export const QuotationForm = ({ tariffs, onSubmit, loading, error }: QuotationFormProps) => {
  const [formData, setFormData] = useState({
    weight: '',
    length: '',
    width: '',
    height: '',
    origin: '',
    destination: ''
  });

  const origins = [...new Set(tariffs.map(tariff => tariff.origin))];
  const destinations = [...new Set(tariffs.map(tariff => tariff.destination))];

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
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
           formData.destination;
  };

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Calculator size={24} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Cotización de Envío
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={3} flexWrap="wrap">
            <Box flex={1} minWidth={300}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <MapPin size={20} />
                <Typography variant="h6">Origen y Destino</Typography>
              </Box>
              
              <TextField
                select
                fullWidth
                label="Ciudad de Origen"
                value={formData.origin}
                onChange={handleChange('origin')}
                margin="normal"
                required
              >
                {origins.map((origin) => (
                  <MenuItem key={origin} value={origin}>
                    {origin}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Ciudad de Destino"
                value={formData.destination}
                onChange={handleChange('destination')}
                margin="normal"
                required
              >
                {destinations.map((destination) => (
                  <MenuItem key={destination} value={destination}>
                    {destination}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box flex={1} minWidth={300}>
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

              <Box display="flex" gap={2} sx={{ mt: 1 }}>
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
              {loading ? 'Calculando...' : 'Calcular Cotización'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}; 