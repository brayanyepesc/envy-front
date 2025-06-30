import { Container } from '@mui/material';
import { DashboardHeader } from '../molecules/DashboardHeader';
import { DashboardStats } from '../molecules/DashboardStats';
import { DashboardContent } from '../molecules/DashboardContent';
import { DashboardLoading } from '../molecules/DashboardLoading';
import { DashboardError } from '../molecules/DashboardError';
import { useDashboard } from '../../hooks/useDashboard';
import { SuccessMessage } from '../../../../components/common';

export const DashboardTemplate = () => {
  const {
    shipments,
    loading,
    error,
    successMessage,
    getShipmentsByStatus,
    getTotalValue,
    handleCreateShipment,
    clearSuccessMessage
  } = useDashboard();

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError error={error} />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SuccessMessage message={successMessage || ''} onClose={clearSuccessMessage} />

      <DashboardHeader onCreateShipment={handleCreateShipment} />

      <DashboardStats 
        shipments={shipments}
        getShipmentsByStatus={getShipmentsByStatus}
        getTotalValue={getTotalValue}
      />

      <DashboardContent shipments={shipments} />
    </Container>
  );
}; 