import { Package } from 'lucide-react';
import { EmptyState } from '../../../../components/common';

export const ShipmentsEmptyState = () => {
  return (
    <EmptyState
      icon={Package}
      title="No hay envíos registrados"
      description="Cuando crees un envío, aparecerá aquí"
      variant="simple"
    />
  );
}; 