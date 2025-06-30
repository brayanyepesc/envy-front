import { useState } from 'react';
import { useAuthStore } from '../../auth/store/auth.store';
import type { QuotationRequestDto, TariffDto } from '../interfaces/quotation.interface';

interface FormData {
  weight: string;
  length: string;
  width: string;
  height: string;
  origin: string;
  destination: string;
}

interface UseQuotationFormProps {
  tariffs: TariffDto[];
  onSubmit: (data: QuotationRequestDto) => void;
  initialData?: Partial<QuotationRequestDto>;
}

export const useQuotationForm = ({ tariffs, onSubmit, initialData = {} }: UseQuotationFormProps) => {
  const user = useAuthStore(state => state.user);
  
  const [formData, setFormData] = useState<FormData>({
    weight: '',
    length: '',
    width: '',
    height: '',
    origin: user?.city || '',
    destination: '',
    ...Object.fromEntries(
      Object.entries(initialData).map(([key, value]) => [
        key, 
        typeof value === 'number' ? value.toString() : value || ''
      ])
    )
  });

  const destinations = [...new Set(tariffs.map(tariff => tariff.destination))];
  const availableDestinations = destinations.filter(destination => destination !== formData.origin);

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'origin' && value === prev.destination ? { destination: '' } : {})
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const quotationData: QuotationRequestDto = {
      weight: parseFloat(formData.weight) || 0,
      length: parseFloat(formData.length) || 0,
      width: parseFloat(formData.width) || 0,
      height: parseFloat(formData.height) || 0,
      origin: formData.origin,
      destination: formData.destination
    };
    
    onSubmit(quotationData);
  };

  const isFormValid = () => {
    return Boolean(
      parseFloat(formData.weight) > 0 && 
      parseFloat(formData.length) > 0 && 
      parseFloat(formData.width) > 0 && 
      parseFloat(formData.height) > 0 && 
      formData.origin && 
      formData.destination &&
      formData.origin !== formData.destination
    );
  };

  const getDestinationError = () => {
    return formData.origin === formData.destination && formData.destination !== ''
      ? "La ciudad de destino no puede ser igual a la de origen"
      : "";
  };

  return {
    formData,
    availableDestinations,
    handleChange,
    handleSubmit,
    isFormValid,
    getDestinationError
  };
}; 