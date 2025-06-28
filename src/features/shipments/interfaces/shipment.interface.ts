export interface CreateShipmentRequestDto {
  origin: string;
  destination: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  quotedPrice: number;
}

export interface CreateShipmentResponseDto {
  id: number;
  trackingNumber: string;
  status: string;
  message: string;
}

export interface ShipmentDetailsResponseDto {
  id: number;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  package: {
    weight: string;
    length: string;
    width: string;
    height: string;
  };
  quotedPrice: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingResponseDto {
  shipmentId: number;
  trackingNumber: string;
  currentStatus: string;
  history: Array<{
    status: string;
    description: string;
    location?: string;
    timestamp: string;
  }>;
}

export interface ShipmentStatusHistory {
  id: number;
  shipmentId: number;
  status: string;
  description: string;
  location?: string;
  createdAt: string;
} 