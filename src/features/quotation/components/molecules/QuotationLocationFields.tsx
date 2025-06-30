import { TextField, Typography, Box, MenuItem } from '@mui/material';
import { MapPin } from 'lucide-react';

interface QuotationLocationFieldsProps {
  origin: string;
  destination: string;
  availableDestinations: string[];
  showDropdowns?: boolean;
  onDestinationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  destinationError: string;
}

export const QuotationLocationFields = ({
  origin,
  destination,
  availableDestinations,
  showDropdowns = true,
  onDestinationChange,
  destinationError
}: QuotationLocationFieldsProps) => {
  return (
    <Box flex={1} minWidth={{ xs: 'auto', lg: 300 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <MapPin size={20} />
        <Typography variant="h6">Origen y Destino</Typography>
      </Box>
      
      <TextField
        fullWidth
        label="Ciudad de Origen"
        value={origin}
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
          value={destination}
          onChange={onDestinationChange}
          margin="normal"
          required
          error={!!destinationError}
          helperText={destinationError || "Selecciona la ciudad de destino"}
        >
          {availableDestinations.map((dest) => (
            <MenuItem key={dest} value={dest}>
              {dest}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          fullWidth
          label="Ciudad de Destino"
          value={destination}
          onChange={onDestinationChange}
          margin="normal"
          required
          error={!!destinationError}
          helperText={destinationError || "Ingresa la ciudad de destino"}
        />
      )}
    </Box>
  );
}; 