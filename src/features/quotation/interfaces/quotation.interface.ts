export interface QuotationRequestDto {
  weight: number;
  length: number;
  width: number;
  height: number;
  origin: string;
  destination: string;
}

export interface QuotationResponseDto {
  price: number;
  volumeWeight: number;
  selectedWeight: number;
  origin: string;
  destination: string;
  pricePerKg: number;
}

export interface TariffDto {
  id: number;
  origin: string;
  destination: string;
  pricePerKg: number;
}

export const AVAILABLE_CITIES = [
  'Medellín',
  'Cartagena',
  'Barranquilla',
  'Bogotá',
  'Cali'
] as const;

export type AvailableCity = typeof AVAILABLE_CITIES[number]; 