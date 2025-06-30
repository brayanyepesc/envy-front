import { useState, useEffect } from 'react';
import { useAuthStore } from '../../auth/store/auth.store';
import { QuotationService } from '../../quotation/services/quotation.service';
import type { CreateShipmentRequestDto, QuotationData } from '../interfaces/shipment.interface';
import type { QuotationRequestDto } from '../../quotation/interfaces/quotation.interface';
import { formatPrice } from '../../../utils/formatters';

interface UseCreateShipmentFormProps {
  quotationData?: QuotationData;
  onSubmit: (data: CreateShipmentRequestDto) => void;
}

export const useCreateShipmentForm = ({ quotationData, onSubmit }: UseCreateShipmentFormProps) => {
  const user = useAuthStore(state => state.user);
  const [showQuotation, setShowQuotation] = useState(false);
  const [quotationPrice, setQuotationPrice] = useState<number | null>(null);
  const [quotationLoading, setQuotationLoading] = useState(false);
  const [quotationError, setQuotationError] = useState<string | null>(null);
  const [currentFormData, setCurrentFormData] = useState<QuotationRequestDto | null>(null);

  useEffect(() => {
    if (quotationData) {
      setQuotationPrice(quotationData.quotedPrice);
    }
  }, [quotationData]);

  const handleGetQuotation = async (formData: QuotationRequestDto) => {
    try {
      setQuotationLoading(true);
      setQuotationError(null);
      setCurrentFormData(formData);

      const quotation = await QuotationService.getQuotation(formData);
      setQuotationPrice(quotation.price);
      setShowQuotation(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener cotización';
      setQuotationError(errorMessage);
    } finally {
      setQuotationLoading(false);
    }
  };

  const handleConfirmQuotation = () => {
    if (quotationPrice && currentFormData) {
      const finalData: CreateShipmentRequestDto = {
        origin: currentFormData.origin,
        destination: currentFormData.destination,
        weight: currentFormData.weight,
        length: currentFormData.length,
        width: currentFormData.width,
        height: currentFormData.height,
        quotedPrice: quotationPrice
      };
      onSubmit(finalData);
    }
  };

  const handleCancelQuotation = () => {
    setShowQuotation(false);
    setQuotationPrice(null);
    setQuotationError(null);
    setCurrentFormData(null);
  };

  const handleSubmit = (formData: QuotationRequestDto) => {
    if (quotationData) {
      const shipmentData: CreateShipmentRequestDto = {
        origin: quotationData.origin,
        destination: quotationData.destination,
        weight: quotationData.weight,
        length: quotationData.length,
        width: quotationData.width,
        height: quotationData.height,
        quotedPrice: quotationData.quotedPrice
      };
      onSubmit(shipmentData);
    } else {
      handleGetQuotation(formData);
    }
  };

  const getInitialData = () => {
    if (quotationData) {
      return {
        origin: quotationData.origin,
        destination: quotationData.destination,
        weight: quotationData.weight,
        length: quotationData.length,
        width: quotationData.width,
        height: quotationData.height
      };
    }
    return {
      origin: user?.city || ''
    };
  };

  return {
    showQuotation,
    quotationPrice,
    quotationLoading,
    quotationError,
    handleSubmit,
    handleConfirmQuotation,
    handleCancelQuotation,
    getInitialData,
    formatPrice
  };
}; 