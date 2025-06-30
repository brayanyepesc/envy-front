import { Typography, Box } from '@mui/material';
import { Calculator } from 'lucide-react';

interface QuotationFormHeaderProps {
  title?: string;
}

export const QuotationFormHeader = ({ title = "Cotización de Envío" }: QuotationFormHeaderProps) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Calculator size={24} />
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  );
}; 