import { EventType } from "./events";

export interface BookingType {
    _id: any;
    event: EventType;
    user: any;
    ticketType: string;
    ticketCount: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}