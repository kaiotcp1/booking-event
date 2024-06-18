'use cliente'

import { Spinner } from "@nextui-org/spinner";
import React from 'react'

const Loading = () => {
    return (
        <div className='flex h-screen fixed justify-center items-center inset-0 text-white bg-gray-800'>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    )
}

export default Loading