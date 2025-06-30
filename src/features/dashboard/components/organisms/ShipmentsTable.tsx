import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { Package, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBadge } from '../molecules/StatusBadge';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface ShipmentsTableProps {
  shipments: ShipmentDetailsResponseDto[];
}

export const ShipmentsTable = ({ shipments }: ShipmentsTableProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numPrice);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleRowClick = (shipment: ShipmentDetailsResponseDto) => {
    navigate(`/tracking/${shipment.trackingNumber}`);
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
    <Box>
      {/* Desktop Table */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
                  onClick={() => handleRowClick(shipment)}
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
      </Box>

      {/* Mobile Cards */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {shipments.map((shipment) => (
          <Card 
            key={shipment.id}
            onClick={() => handleRowClick(shipment)}
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.875rem' }}>
                  {shipment.trackingNumber}
                </Typography>
                <StatusBadge status={shipment.status} />
              </Box>
              
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <MapPin size={14} color="#6b7280" />
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  {shipment.origin} → {shipment.destination}
                </Typography>
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <DollarSign size={14} color="#2e7d32" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.875rem' }}>
                    {formatPrice(shipment.quotedPrice)}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <Calendar size={14} color="#6b7280" />
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                    {formatDate(new Date(shipment.createdAt))}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}; 