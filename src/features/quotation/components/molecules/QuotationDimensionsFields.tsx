import { TextField, Typography, Box } from '@mui/material';
import { Package } from 'lucide-react';

interface QuotationDimensionsFieldsProps {
  weight: string;
  length: string;
  width: string;
  height: string;
  onWeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuotationDimensionsFields = ({
  weight,
  length,
  width,
  height,
  onWeightChange,
  onLengthChange,
  onWidthChange,
  onHeightChange
}: QuotationDimensionsFieldsProps) => {
  return (
    <Box flex={1} minWidth={{ xs: 'auto', lg: 300 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Package size={20} />
        <Typography variant="h6">Dimensiones del Paquete</Typography>
      </Box>
      
      <TextField
        fullWidth
        label="Peso (kg)"
        type="number"
        value={weight}
        onChange={onWeightChange}
        margin="normal"
        required
        inputProps={{ min: 0, step: 0.1 }}
      />

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Largo (cm)"
          type="number"
          value={length}
          onChange={onLengthChange}
          required
          inputProps={{ min: 0, step: 0.1 }}
        />
        <TextField
          fullWidth
          label="Ancho (cm)"
          type="number"
          value={width}
          onChange={onWidthChange}
          required
          inputProps={{ min: 0, step: 0.1 }}
        />
        <TextField
          fullWidth
          label="Alto (cm)"
          type="number"
          value={height}
          onChange={onHeightChange}
          required
          inputProps={{ min: 0, step: 0.1 }}
        />
      </Box>
    </Box>
  );
}; 