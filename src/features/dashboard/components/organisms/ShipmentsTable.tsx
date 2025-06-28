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
import { StatusBadge } from '../molecules/StatusBadge';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface ShipmentsTableProps {
  shipments: ShipmentDetailsResponseDto[];
}

export const ShipmentsTable = ({ shipments }: ShipmentsTableProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(numericPrice);
  };

  if (shipments.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        py={4}
        sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}
      >
        <Package size={48} color="#ccc" />
        <Typography variant="h6" color="textSecondary" mt={2}>
          No hay envíos registrados
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Cuando crees un envío, aparecerá aquí
        </Typography>
      </Box>
    );
  }

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
              sx={{ 
                '&:hover': { 
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer'
                } 
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
                  {formatDate(shipment.createdAt)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 