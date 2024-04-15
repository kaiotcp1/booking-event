'use client';
import { UserButton } from '@clerk/nextjs';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, menu } from '@nextui-org/react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { title } from 'process';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const menusForAdmin = [{
        title: 'Home',
        path: '/'
    },
    {
        title: 'Events',
        path: '/admin/events'
    },
    {
        title: 'Bookings',
        path: '/admin/bookings'
    },
    {
        title: 'Users',
        path: '/admin/users'
    },
    {
        title: 'Reports',
        path: '/admin/reports'
    }
    ];

    const menusForUser = [{
            title: 'Home',
            path: '/'
        },
        {
            title: 'Bookings',
            path: '/users/bookings'
        }
    ];


    const pathname = usePathname();
    const router = useRouter();
    const [menusToShow, setMenusToShow] = React.useState<any[]>([]);
    const isPrivateRoute = !['/sign-in', '/sign-up'].includes(pathname);

    const getUserData = async () => {
        try {
            const response = await axios.get('/api/current-user');
            console.log('response: ', response.data);
            if (response.data.user.isAdmin) {
                setMenusToShow(menusForAdmin);
            } else {
                setMenusToShow(menusForUser);
            }
        } catch (error: any) {
            console.log('error:', error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isPrivateRoute) {
            getUserData();
        }
    }, []);

    return (
        <div className='bg-gray-800 h-screen'>
            {isPrivateRoute && <div className='bg-gray-700 flex justify-between items-center p-2 shadow-md'>
                <h1 className='text-white font-semi bolb text-xl'>Event Booking</h1>

                <div className='flex px-3 gap-5 items-center'>
                    <Dropdown size='sm'>
                        <DropdownTrigger>
                            <Button
                                className='bg-white text-black'
                                variant="shadow"
                                color="primary"
                            >
                                Profile
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu className='bg-gray-700 shadow-lg' aria-label="Static Actions">
                            {menusToShow.map((menu) => (
                                <DropdownItem className='bg-gray-700 hover:bg-gray-600 duration-500 p-3 mt-3 shadow-lg'
                                    key={menu.title}
                                    onClick={() => {
                                        router.push(menu.path);
                                    }}
                                >
                                    {menu.title}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <UserButton afterSignOutUrl='/sign-in' />
                </div>
            </div>}

            <div className=''>
                {children}
            </div>
        </div>
    )
}

export default LayoutProvider