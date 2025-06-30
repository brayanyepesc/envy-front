import { Button, Box } from '@mui/material';
import { Calculator } from 'lucide-react';

interface QuotationSubmitButtonProps {
  loading: boolean;
  isValid: boolean;
  submitButtonText?: string;
}

export const QuotationSubmitButton = ({ 
  loading, 
  isValid, 
  submitButtonText = "Calcular Cotización" 
}: QuotationSubmitButtonProps) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<Calculator size={20} />}
        disabled={loading || !isValid}
        sx={{
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          color: 'white',
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 2,
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
        {loading ? 'Calculando...' : submitButtonText}
      </Button>
    </Box>
  );
}; 