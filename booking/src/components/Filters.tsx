'use client';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Filters = () => {
    const router = useRouter();
    const [filters, setFilters] = React.useState({
        name: '',
        date: '',
    });

    useEffect(() => {
        setTimeout(() => {
            router.push(`/?name=${filters.name}&date=${filters.date}`);
        }, 400);
    }, [filters.name]);

    useEffect(() => {
        router.push(`/?name=${filters.name}&date=${filters.date}`);
    }, [filters.date]);

    return (
        <div className='bg-gray-700 p-5 flex flex-col md:flex-row gap-2 md:items-end items-start w-full'>
            <div className="w-full">
                <h1 className="text-sm text-gray-400">
                    Search for an event by name
                </h1>
                <input
                    type='text'
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    placeholder='Search for an event'
                    className='w-full p-2 rounded-sm border border-gray-200'
                />
            </div>

            <div className="w-full">
                <h1 className="text-sm text-gray-400">
                    Search for an event by date
                </h1>
                <input
                    type='date'
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    placeholder='Search for an event'
                    className='w-full p-2 rounded-sm border border-gray-200'
                />
            </div>
            <div>
                <Button onClick={() => setFilters({ name: '', date: '' })}>
                    Clear
                </Button>
            </div>
        </div>
    );
}

export default Filters;
