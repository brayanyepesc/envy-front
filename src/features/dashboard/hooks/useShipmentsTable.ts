import { useNavigate } from 'react-router';
import type { ShipmentDetailsResponseDto } from '../../shipments/interfaces/shipment.interface';

export const useShipmentsTable = () => {
  const navigate = useNavigate();

  const handleShipmentClick = (shipment: ShipmentDetailsResponseDto) => {
    navigate(`/tracking/${shipment.trackingNumber}`);
  };

  return {
    handleShipmentClick
  };
}; 