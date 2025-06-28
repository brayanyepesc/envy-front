import { useState, useCallback } from 'react';
import { ShipmentService } from '../services/shipment.service';
import type { 
  CreateShipmentRequestDto, 
  CreateShipmentResponseDto, 
  ShipmentDetailsResponseDto, 
  TrackingResponseDto 
} from '../interfaces/shipment.interface';

export const useShipments = () => {
  const [shipments, setShipments] = useState<ShipmentDetailsResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ShipmentService.getShipments();
      setShipments(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar envíos';
      setError(errorMessage);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createShipment = useCallback(async (shipmentData: CreateShipmentRequestDto): Promise<CreateShipmentResponseDto> => {
    try {
      setLoading(true);
      setError(null);
      const newShipment = await ShipmentService.createShipment(shipmentData);
      await fetchShipments();
      return newShipment;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear envío';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchShipments]);

  const getShipmentById = useCallback(async (id: number): Promise<ShipmentDetailsResponseDto> => {
    try {
      setLoading(true);
      setError(null);
      return await ShipmentService.getShipmentById(id);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar envío';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getShipmentTracking = useCallback(async (trackingNumber: string): Promise<TrackingResponseDto> => {
    try {
      setLoading(true);
      setError(null);
      return await ShipmentService.getShipmentTracking(trackingNumber);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar seguimiento';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getShipmentsByStatus = useCallback((status: string) => {
    if (!Array.isArray(shipments)) return [];
    return shipments.filter(shipment => shipment.status === status);
  }, [shipments]);

  const getTotalValue = useCallback(() => {
    if (!Array.isArray(shipments)) return 0;
    return shipments.reduce((total, shipment) => {
      const price = typeof shipment.quotedPrice === 'string' 
        ? parseFloat(shipment.quotedPrice) 
        : shipment.quotedPrice;
      return total + price;
    }, 0);
  }, [shipments]);

  const getAverageWeight = useCallback(() => {
    if (!Array.isArray(shipments) || shipments.length === 0) return 0;
    const totalWeight = shipments.reduce((total, shipment) => {
      const weight = typeof shipment.package.weight === 'string' 
        ? parseFloat(shipment.package.weight) 
        : shipment.package.weight;
      return total + weight;
    }, 0);
    return totalWeight / shipments.length;
  }, [shipments]);

  const getShipmentsByMonth = useCallback(() => {
    if (!Array.isArray(shipments)) return {};
    const months: { [key: string]: number } = {};
    shipments.forEach(shipment => {
      const date = new Date(shipment.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months[monthKey] = (months[monthKey] || 0) + 1;
    });
    return months;
  }, [shipments]);

  return {
    shipments,
    loading,
    error,
    fetchShipments,
    createShipment,
    getShipmentById,
    getShipmentTracking,
    clearError,
    getShipmentsByStatus,
    getTotalValue,
    getAverageWeight,
    getShipmentsByMonth,
  };
}; 