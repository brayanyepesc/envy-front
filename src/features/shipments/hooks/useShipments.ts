import { useState, useEffect } from 'react';
import { ShipmentService } from '../services/shipment.service';
import type { ShipmentDetailsResponseDto, TrackingResponseDto } from '../interfaces/shipment.interface';

export const useShipments = () => {
  const [shipments, setShipments] = useState<ShipmentDetailsResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ShipmentService.getUserShipments();
      setShipments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar los envíos');
      console.error('Error fetching shipments:', err);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const getShipmentTracking = async (trackingNumber: string): Promise<TrackingResponseDto | null> => {
    try {
      return await ShipmentService.getShipmentTracking(trackingNumber);
    } catch (err) {
      console.error('Error fetching tracking:', err);
      return null;
    }
  };

  const getShipmentsByStatus = (status: string) => {
    if (!Array.isArray(shipments)) return [];
    return shipments.filter(shipment => shipment.status === status);
  };

  const getTotalValue = () => {
    if (!Array.isArray(shipments)) return 0;
    return shipments.reduce((total, shipment) => total + parseFloat(shipment.quotedPrice), 0);
  };

  const getAverageWeight = () => {
    if (!Array.isArray(shipments) || shipments.length === 0) return 0;
    const totalWeight = shipments.reduce((total, shipment) => total + parseFloat(shipment.package.weight), 0);
    return totalWeight / shipments.length;
  };

  const getShipmentsByMonth = () => {
    if (!Array.isArray(shipments)) return {};
    const months: { [key: string]: number } = {};
    shipments.forEach(shipment => {
      const date = new Date(shipment.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months[monthKey] = (months[monthKey] || 0) + 1;
    });
    return months;
  };

  return {
    shipments,
    loading,
    error,
    fetchShipments,
    getShipmentTracking,
    getShipmentsByStatus,
    getTotalValue,
    getAverageWeight,
    getShipmentsByMonth,
  };
}; 