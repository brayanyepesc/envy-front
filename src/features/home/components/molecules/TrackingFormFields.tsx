import { TextField, Button, Box } from '@mui/material';
import { Search, MapPin } from 'lucide-react';

interface TrackingFormFieldsProps {
  trackingNumber: string;
  error: string;
  onTrackingNumberChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TrackingFormFields = ({
  trackingNumber,
  error,
  onTrackingNumberChange,
  onKeyPress,
  onSubmit
}: TrackingFormFieldsProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <TextField
          fullWidth
          label="Número de Seguimiento"
          value={trackingNumber}
          onChange={(e) => onTrackingNumberChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ejemplo: 56000000000"
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <MapPin size={20} color="#6b7280" style={{ marginRight: 8 }} />
            )
          }}
          sx={{ flex: 1, minWidth: { xs: 'auto', sm: 300 } }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<Search size={20} />}
          disabled={!trackingNumber.trim()}
          sx={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            px: { xs: 2, sm: 4 },
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: 2,
            minWidth: { xs: 'auto', sm: 'fit-content' },
            '&:hover': {
              background: 'linear-gradient(to right, #1d4ed8, #4338ca)',
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
            },
            '&:disabled': {
              background: '#e5e7eb',
              color: '#9ca3af'
            }
          }}
        >
          Rastrear
        </Button>
      </Box>
    </form>
  );
}; 