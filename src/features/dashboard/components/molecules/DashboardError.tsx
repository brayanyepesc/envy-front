import { Container } from '@mui/material';
import { ErrorMessage } from '../../../../components/common';

interface DashboardErrorProps {
  error: string;
}

export const DashboardError = ({ error }: DashboardErrorProps) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <ErrorMessage message={error} />
    </Container>
  );
}; 