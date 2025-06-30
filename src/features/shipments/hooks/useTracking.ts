import { useState, useEffect, useCallback, useRef } from 'react';
import { ShipmentService } from '../services/shipment.service';
import type { TrackingResponseDto } from '../interfaces/shipment.interface';

interface UseTrackingOptions {
  trackingNumber?: string;
  shipmentId?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // en milisegundos
}

export const useTracking = (options: UseTrackingOptions = {}) => {
  const { 
    trackingNumber, 
    shipmentId, 
    autoRefresh = true, 
    refreshInterval = 30000 // 30 segundos por defecto
  } = options;

  const [trackingData, setTrackingData] = useState<TrackingResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTracking = useCallback(async () => {
    if (!trackingNumber && !shipmentId) {
      setError('Se requiere número de seguimiento o ID de envío');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let data: TrackingResponseDto;
      if (trackingNumber) {
        data = await ShipmentService.getShipmentTracking(trackingNumber);
      } else if (shipmentId) {
        // Si no hay endpoint específico por ID, usamos el tracking number
        const shipment = await ShipmentService.getShipmentById(shipmentId);
        data = await ShipmentService.getShipmentTracking(shipment.trackingNumber);
      } else {
        throw new Error('Se requiere número de seguimiento o ID de envío');
      }

      setTrackingData(data);
      setLastUpdate(new Date());
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar seguimiento';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [trackingNumber, shipmentId]);

  // Función para iniciar el polling automático
  const startAutoRefresh = useCallback(() => {
    if (!autoRefresh || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      fetchTracking();
    }, refreshInterval);
  }, [autoRefresh, refreshInterval, fetchTracking]);

  // Función para detener el polling automático
  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Función para actualizar manualmente
  const refresh = useCallback(() => {
    fetchTracking();
  }, [fetchTracking]);

  // Función para obtener el estado actual del envío
  const getCurrentStatus = useCallback(() => {
    return trackingData?.currentStatus || 'unknown';
  }, [trackingData]);

  // Función para obtener el historial de estados
  const getStatusHistory = useCallback(() => {
    return trackingData?.history || [];
  }, [trackingData]);

  // Función para verificar si el envío está en tránsito
  const isInTransit = useCallback(() => {
    return getCurrentStatus() === 'in_transit';
  }, [getCurrentStatus]);

  // Función para verificar si el envío está entregado
  const isDelivered = useCallback(() => {
    return getCurrentStatus() === 'delivered';
  }, [getCurrentStatus]);

  // Función para verificar si el envío está esperando
  const isWaiting = useCallback(() => {
    return getCurrentStatus() === 'waiting';
  }, [getCurrentStatus]);

  // Función para obtener el tiempo transcurrido desde el último estado
  const getTimeSinceLastUpdate = useCallback(() => {
    if (!lastUpdate) return null;
    
    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'Hace un momento';
  }, [lastUpdate]);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    if (trackingNumber || shipmentId) {
      fetchTracking();
    }
  }, [trackingNumber, shipmentId, fetchTracking]);

  // Efecto para manejar el polling automático
  useEffect(() => {
    if (autoRefresh && (trackingNumber || shipmentId)) {
      startAutoRefresh();
    }

    return () => {
      stopAutoRefresh();
    };
  }, [autoRefresh, trackingNumber, shipmentId, startAutoRefresh, stopAutoRefresh]);

  // Efecto para limpiar el intervalo cuando el componente se desmonta
  useEffect(() => {
    return () => {
      stopAutoRefresh();
    };
  }, [stopAutoRefresh]);

  return {
    trackingData,
    loading,
    error,
    lastUpdate,
    refresh,
    startAutoRefresh,
    stopAutoRefresh,
    getCurrentStatus,
    getStatusHistory,
    isInTransit,
    isDelivered,
    isWaiting,
    getTimeSinceLastUpdate,
    clearError: () => setError(null)
  };
}; 