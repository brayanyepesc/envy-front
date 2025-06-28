import { api } from '../../../api/axios.api';
import type { 
  CreateShipmentRequestDto, 
  CreateShipmentResponseDto, 
  ShipmentDetailsResponseDto, 
  TrackingResponseDto 
} from '../interfaces/shipment.interface';

export class ShipmentService {
  static async createShipment(data: CreateShipmentRequestDto): Promise<CreateShipmentResponseDto> {
    try {
      const response = await api.post('/shipment', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  }

  static async getShipments(): Promise<ShipmentDetailsResponseDto[]> {
    try {
      const response = await api.get('/shipment');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching shipments:', error);
      throw error;
    }
  }

  static async getShipmentById(id: number): Promise<ShipmentDetailsResponseDto> {
    try {
      const response = await api.get(`/shipment/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching shipment:', error);
      throw error;
    }
  }

  static async getShipmentTracking(trackingNumber: string): Promise<TrackingResponseDto> {
    try {
      const response = await api.get(`/shipment/tracking/${trackingNumber}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tracking:', error);
      throw error;
    }
  }
} 