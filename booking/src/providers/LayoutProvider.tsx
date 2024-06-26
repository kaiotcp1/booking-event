'use client';
import Footer from '@/components/Footer';
import { UserButton } from '@clerk/nextjs';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, menu } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { title } from 'process';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = React.useState(false);
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
        path: '/bookings'
    }
    ];


    const pathname = usePathname();
    const router = useRouter();
    const [menusToShow, setMenusToShow] = React.useState<any[]>([]);
    const isPrivateRoute = !['/sign-in', '/sign-up'].includes(pathname);

    const getUserData = async () => {
        try {
            const response = await axios.get('/api/current-user');
            if (response.data.user.isAdmin) {
                setMenusToShow(menusForAdmin);
                setIsAdmin(true);
            } else {
                setMenusToShow(menusForUser);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isPrivateRoute) {
            getUserData();
        }
    }, []);

    useEffect(() => {
        if (!isAdmin && pathname.includes('/admin')) {
            router.push('/');
        }
    }, [pathname]);

    return (
        <div className='bg-gray-800 min-h-screen'>
            {isPrivateRoute && <div className='bg-gray-700 flex justify-between items-center p-2 shadow-md'>
                <h1 className='mx-5 text-white font-semi bolb text-xl cursor-pointer'
                    onClick={() => router.push('/')}>Event Booking</h1>

                <div className='flex px-3 gap-5 items-center'>
                    <Dropdown size='sm'>
                        <DropdownTrigger>
                            <Button
                                className='bg-white text-black'
                                variant="shadow"
                                color="primary"
                            >
                                Menu
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu className='bg-gray-700 shadow-lg' aria-label="Static Actions">
                            {menusToShow.map((menu) => (
                                <DropdownItem className='bg-gray-600 hover:bg-gray-500 duration-500 p-3 mt-3 shadow-lg text-white'
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

            <div className='min-h-screen'>
                {!isAdmin && pathname.includes('/admin') ?
                    <div>
                        <h1 className='flex justify-center items-center h-screen text-center text-white'>Unauthorized access: <b className='text-blue-400'>User does not have admin privileges.</b></h1>
                    </div> : children}

            </div>
            <Footer />
        </div>
    )
}

export default LayoutProvider