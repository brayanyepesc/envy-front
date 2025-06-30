import { Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { PageHeader } from '../../../../components/common';

interface DashboardHeaderProps {
  onCreateShipment: () => void;
}

export const DashboardHeader = ({ onCreateShipment }: DashboardHeaderProps) => {
  return (
    <PageHeader
      title="Dashboard de Envíos"
      subtitle="Resumen completo de tus envíos y estadísticas"
      action={
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={onCreateShipment}
          sx={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': {
              background: 'linear-gradient(to right, #1d4ed8, #4338ca)'
            }
          }}
        >
          Crear Envío
        </Button>
      }
    />
  );
}; 