
export enum BookingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  USED = 'USED',
  CANCELLED = 'CANCELLED'
}

export interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  amount: number;
  currency: string;
  status: BookingStatus;
  createdAt: number;
  paystackRef?: string;
}

export interface AppState {
  reservations: Reservation[];
  activeReservationId: string | null;
}
