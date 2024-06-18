'use client'
import { EventType } from '@/interfaces/events'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const columns = ['Name', 'Organizer', 'Date', 'Time', 'Location', 'Actions'];

const EventsTableForReports = ({ events }: { events: EventType[] }) => {
    const router = useRouter();

    return (
        <div className=''>
            <div className='overflow-x-auto bg-slate-700 shadow-lg'>
                <Table className='min-w-full bg-slate-700 shadow-md' aria-label="Events Table">
                    <TableHeader className='bg-slate-800 shadow-md'>
                        {columns.map((column: any, index: number) => {
                            const isHiddenOnMobile = column !== 'Actions' && index > 1;
                            return (
                                <TableColumn key={index} className={`bg-gray-700 shadow-md text-white p-3 text-md ${isHiddenOnMobile ? 'hidden md:table-cell shadow-md' : ''}`}>
                                    {column}
                                </TableColumn>
                            )
                        })}
                    </TableHeader>
                    <TableBody className='bg-slate-300 shadow-md'>
                        {events.map((event: any, index: number) => {
                            return (
                                <TableRow key={event._id} className='text-center text-white bg-gray-900 shadow-md'>
                                    <TableCell className='p-3 bg-gray-700'>{event.name}</TableCell>
                                    <TableCell className='p-3 bg-gray-700'>{event.organizer}</TableCell>
                                    <TableCell className='p-3 bg-gray-700 hidden md:table-cell'>{event.date}</TableCell>
                                    <TableCell className='p-3 bg-gray-700 hidden md:table-cell'>{event.time}</TableCell>
                                    <TableCell className='p-3 bg-gray-700 hidden md:table-cell'>{event.location}</TableCell>
                                    <TableCell className='p-3 bg-gray-700'>
                                        <div className="flex gap-2 justify-center">
                                            <Button onClick={() => { router.push(`/admin/reports/${event._id}`) }}>View Report</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}

export default EventsTableForReports
