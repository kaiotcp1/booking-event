import { EventType } from "./events";

export interface BookingType {
    _id: any;
    event: EventType;
    user: any;
    paymentId: string;
    ticketType: string;
    ticketsCount: number;
    status: string;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
  }