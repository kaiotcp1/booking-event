"use client"
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const UiLibraryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextUIProvider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {children}
        </NextUIProvider>
    )
}

export default UiLibraryProvider

