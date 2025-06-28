import { api } from '../../../api/axios.api';
import type { 
  QuotationRequestDto, 
  QuotationResponseDto, 
  TariffDto 
} from '../interfaces/quotation.interface';

export class QuotationService {
  static async getQuotation(quotationData: QuotationRequestDto): Promise<QuotationResponseDto> {
    try {
      const response = await api.post('/quotation/quotation', quotationData);
      return response.data.data;
    } catch (error) {
      console.error('Error getting quotation:', error);
      throw error;
    }
  }

  static async getAllTariffs(): Promise<TariffDto[]> {
    try {
      const response = await api.get('/quotation/tariffs');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tariffs:', error);
      throw error;
    }
  }
} 