import { 
  Card, 
  CardContent, 
  Typography, 
  Box 
} from '@mui/material';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { formatPrice, formatDate } from '../../../../utils/formatters';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface ShipmentsMobileCardsProps {
  shipments: ShipmentDetailsResponseDto[];
  onCardClick: (shipment: ShipmentDetailsResponseDto) => void;
}

export const ShipmentsMobileCards = ({ shipments, onCardClick }: ShipmentsMobileCardsProps) => {
  return (
    <>
      {shipments.map((shipment) => (
        <Card 
          key={shipment.id}
          onClick={() => onCardClick(shipment)}
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
    </>
  );
}; 