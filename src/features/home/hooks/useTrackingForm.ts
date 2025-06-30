import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useTrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateTrackingNumber = (value: string): string => {
    if (!value.trim()) {
      return 'Por favor ingresa un número de seguimiento';
    }
    
    if (value.trim().length < 8) {
      return 'El número de seguimiento debe tener al menos 8 caracteres';
    }
    
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateTrackingNumber(trackingNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    navigate(`/tracking/${trackingNumber.trim()}`);
  };

  const handleTrackingNumberChange = (value: string) => {
    setTrackingNumber(value);
    if (error) setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const formEvent = e as unknown as React.FormEvent;
      handleSubmit(formEvent);
    }
  };

  const handleQuotationClick = () => {
    navigate('/quotation');
  };

  return {
    trackingNumber,
    error,
    handleSubmit,
    handleTrackingNumberChange,
    handleKeyPress,
    handleQuotationClick
  };
}; 