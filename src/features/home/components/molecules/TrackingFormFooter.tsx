import { Typography, Button, Box } from '@mui/material';

interface TrackingFormFooterProps {
  onQuotationClick: () => void;
}

export const TrackingFormFooter = ({ onQuotationClick }: TrackingFormFooterProps) => {
  return (
    <Box mt={3} textAlign="center">
      <Typography variant="body2" color="textSecondary">
        💡 ¿No tienes un número de seguimiento? 
        <Button 
          onClick={onQuotationClick}
          sx={{ 
            textTransform: 'none', 
            color: '#2563eb',
            fontWeight: 600,
            p: 0,
            minWidth: 'auto',
            '&:hover': {
              background: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Cotiza tu envío aquí
        </Button>
      </Typography>
    </Box>
  );
}; 