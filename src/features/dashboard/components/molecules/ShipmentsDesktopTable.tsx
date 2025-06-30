import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Box
} from '@mui/material';
import { Package, MapPin, Calendar, DollarSign } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { formatPrice, formatDate } from '../../../../utils/formatters';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface ShipmentsDesktopTableProps {
  shipments: ShipmentDetailsResponseDto[];
  onRowClick: (shipment: ShipmentDetailsResponseDto) => void;
}

export const ShipmentsDesktopTable = ({ shipments, onRowClick }: ShipmentsDesktopTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
            <TableCell sx={{ fontWeight: 600 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Package size={16} />
                Número de Seguimiento
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <MapPin size={16} />
                Origen - Destino
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <DollarSign size={16} />
                Precio
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Calendar size={16} />
                Fecha
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow 
              key={shipment.id} 
              onClick={() => onRowClick(shipment)}
              sx={{ 
                '&:hover': { 
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer'
                },
                transition: 'background-color 0.2s ease-in-out'
              }}
            >
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                  {shipment.trackingNumber}
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    {shipment.origin}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {shipment.destination}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <StatusBadge status={shipment.status} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                  {formatPrice(shipment.quotedPrice)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatDate(new Date(shipment.createdAt))}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 