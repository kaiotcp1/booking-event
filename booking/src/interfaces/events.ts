export interface EventType {
    name: string;
    organizer: string;
    description: string;
    guests: string[];

    location: string
    date: string;
    time: string;

    ticketTypes: {
        name: string;
        price: number;
        limit: number;
    }[]

    images: string[];

    createdAt: Date;
    updatedAt: Date;
    user: any;
};