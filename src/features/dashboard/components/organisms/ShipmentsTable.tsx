import { Box } from '@mui/material';
import { ShipmentsEmptyState } from '../molecules/ShipmentsEmptyState';
import { ShipmentsDesktopTable } from '../molecules/ShipmentsDesktopTable';
import { ShipmentsMobileCards } from '../molecules/ShipmentsMobileCards';
import { useShipmentsTable } from '../../hooks/useShipmentsTable';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface ShipmentsTableProps {
  shipments: ShipmentDetailsResponseDto[];
}

export const ShipmentsTable = ({ shipments }: ShipmentsTableProps) => {
  const { handleShipmentClick } = useShipmentsTable();

  if (shipments.length === 0) {
    return <ShipmentsEmptyState />;
  }

  return (
    <Box>
      {/* Desktop Table */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <ShipmentsDesktopTable 
          shipments={shipments} 
          onRowClick={handleShipmentClick} 
        />
      </Box>

      {/* Mobile Cards */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <ShipmentsMobileCards 
          shipments={shipments} 
          onCardClick={handleShipmentClick} 
        />
      </Box>
    </Box>
  );
}; 