'use client'
import { Button } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'

const PageTitle = ({ title }: { title: string }) => {
    const router = useRouter();
    return (
        <div className='flex items-center m-2 gap-5'>
            <Button isIconOnly onClick={() => router.back()} className='shadow-md text-cyan-700'>
                <i className="ri-arrow-left-line text-lg"></i>
            </Button>
            <h1 className='text-2xl font-semibold text-white'>{title}</h1>
        </div>
    )
}

export default PageTitle