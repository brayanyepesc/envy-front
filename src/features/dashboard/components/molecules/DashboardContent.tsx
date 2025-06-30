import { Box, Paper } from '@mui/material';
import { DashboardCharts } from '../organisms/DashboardCharts';
import { ShipmentsTable } from '../organisms/ShipmentsTable';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface DashboardContentProps {
  shipments: ShipmentDetailsResponseDto[];
}

export const DashboardContent = ({ shipments }: DashboardContentProps) => {
  if (shipments.length === 0) {
    return null;
  }

  return (
    <>
      <Box mb={4}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <DashboardCharts shipments={shipments} />
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <ShipmentsTable shipments={shipments.slice(0, 10)} />
        </Paper>
      </Box>
    </>
  );
}; 