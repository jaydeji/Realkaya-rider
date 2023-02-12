export const OrderType = {
  REGULAR: 'REGULAR',
  PREMIUM: 'PREMIUM',
};
export type OrderType = typeof OrderType[keyof typeof OrderType];

export const PaymentMethod = {
  CASH: 'CASH',
  POS: 'POS',
  CARD: 'CARD',
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

export type Order = {
  orderId: number;
  confirmedAt: string | null;
  orderType: OrderType;
  pickUpStartAt: string | null;
  pickUpArrivedAt: string | null;
  pickUpPickedAt: string | null;
  senderLongitude: number;
  senderLatitude: number;
  senderAddress: string;
  dropOffStartAt: string | null;
  dropOffArrivedAt: string | null;
  recepientLongitude: number;
  recepientLatitude: number;
  recepientAddress: string;
  recepientName: string;
  recepientPhone: string;
  cancelledAt: string | null;
  deliveredAt: string | null;
  distance: number;
  estimatedTime: number | null;
  estimatedFee: number;
  rating: number | null;
  packageWeight: number | null;
  markOrder: null;
  cancelOrder: null;
  paymentMethod: PaymentMethod;
  riderId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type SheetRoute = {
  name: string;
  snapPoint: string;
  snapPoints: string[];
  options?: Record<string, unknown>;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type User = {
  online: boolean;
  profilePhotoUrl?: string;
  firstName: string;
};
export type UserWithCred = {
  token: string;
  user: User;
};
