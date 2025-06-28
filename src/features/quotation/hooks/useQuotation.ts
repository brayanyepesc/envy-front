import { useState, useCallback } from 'react';
import { QuotationService } from '../services/quotation.service';
import type { 
  QuotationRequestDto, 
  QuotationResponseDto, 
  TariffDto 
} from '../interfaces/quotation.interface';

export const useQuotation = () => {
  const [quotation, setQuotation] = useState<QuotationResponseDto | null>(null);
  const [tariffs, setTariffs] = useState<TariffDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuotation = useCallback(async (quotationData: QuotationRequestDto) => {
    try {
      setLoading(true);
      setError(null);
      const data = await QuotationService.getQuotation(quotationData);
      setQuotation(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener la cotización';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTariffs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await QuotationService.getAllTariffs();
      setTariffs(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las tarifas';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearQuotation = useCallback(() => {
    setQuotation(null);
    setError(null);
  }, []);

  return {
    quotation,
    tariffs,
    loading,
    error,
    getQuotation,
    fetchTariffs,
    clearQuotation,
  };
}; 