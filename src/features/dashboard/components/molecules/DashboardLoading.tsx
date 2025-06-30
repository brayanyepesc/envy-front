import { Container } from '@mui/material';
import { LoadingSpinner } from '../../../../components/common';

export const DashboardLoading = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <LoadingSpinner message="Cargando envíos..." />
    </Container>
  );
}; 