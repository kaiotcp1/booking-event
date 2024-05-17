'use cliente'

import {Spinner} from "@nextui-org/spinner";
import React from 'react'

const Loading = () => {
    return (
        <div className='flex h-screen fixed justify-center items-center inset-0 text-white '>
    <Spinner label="Loading..." color="primary" size='lg'/>
        </div>
    )
}

export default Loading