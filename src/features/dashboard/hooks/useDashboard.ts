import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useShipments } from '../../shipments/hooks/useShipments';

export const useDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { 
    shipments, 
    loading, 
    error, 
    getShipmentsByStatus, 
    getTotalValue,
    fetchShipments
  } = useShipments();

  const shipmentsArray = Array.isArray(shipments) ? shipments : [];

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleCreateShipment = () => {
    navigate('/shipment/create');
  };

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  return {
    shipments: shipmentsArray,
    loading,
    error,
    successMessage,
    getShipmentsByStatus,
    getTotalValue,
    handleCreateShipment,
    clearSuccessMessage
  };
}; 