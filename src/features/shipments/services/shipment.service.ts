import { api } from '../../../api/axios.api';
import type { 
  CreateShipmentRequestDto, 
  CreateShipmentResponseDto, 
  ShipmentDetailsResponseDto, 
  TrackingResponseDto 
} from '../interfaces/shipment.interface';

export class ShipmentService {
  static async getUserShipments(): Promise<ShipmentDetailsResponseDto[]> {
    try {
      const response = await api.get('/shipment');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching user shipments:', error);
      throw error;
    }
  }

  static async getShipmentById(shipmentId: number): Promise<ShipmentDetailsResponseDto> {
    try {
      const response = await api.get(`/shipment/${shipmentId}`);
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

  static async createShipment(shipmentData: CreateShipmentRequestDto): Promise<CreateShipmentResponseDto> {
    try {
      const response = await api.post('/shipment', shipmentData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  }
} 