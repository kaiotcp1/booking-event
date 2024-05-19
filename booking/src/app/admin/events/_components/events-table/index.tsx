'use client'
import { EventType } from '@/interfaces/events'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const columns = ['Name', 'Organizer', 'Date', 'Time', 'Location', 'Actions'];

const EventsTable = ({ events }: { events: EventType[] }) => {
    const router = useRouter();
    const [selectedIdToDelete, setSelectedIdToDelete] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const onDelete = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(`/api/admin/events/${id}`);
            toast.success('Event deleted successfully!');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSelectedIdToDelete('');
            setLoading(false);
        }
    };

    return (
        <div className='bg-black'>
            <Table className='bg-slate-700' aria-label="Example static collection table">
                <TableHeader className='bg-slate-800'>
                    {columns.map((column: any, index: number) => {
                        return (
                            <TableColumn key={index} className='bg-gray-700 shadow-md text-white p-3 text-md'>{column}</TableColumn>
                        )
                    })}
                </TableHeader>
                <TableBody className='bg-slate-300 shadow-lg'>
                    {events.map((event: any, index: number) => {
                        return (
                            <TableRow className='text-center text-white shadow-md' key={event._id}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.organizer}</TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>{event.time}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    <div className="flex gap-5 justify-center">
                                        <Button onClick={() => {
                                            setSelectedIdToDelete(event._id);
                                            onDelete(event._id);
                                        }}
                                            isLoading={loading && selectedIdToDelete === event._id}
                                            isIconOnly>
                                            {selectedIdToDelete !== event._id && (
                                                <i className="ri-delete-bin-line text-cyan-700"></i>
                                            )}
                                        </Button>
                                        <Button onClick={() => router.push(`/admin/events/edit-event/${event._id}`)} isIconOnly><i className="ri-edit-line text-cyan-700"></i></Button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default EventsTable