import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-start mt-10 md:flex md:flex-row md:justify-between md:items-center p-5 bg-gray-700 shadow-md'>
            <div className='text-sm text-white'>
                <h1>Project Created by <b className='text-blue-300'>Kaio HP</b></h1>
            </div>
            <div className='text-sm text-white'>
                <h1>My <b className='text-blue-300'><Link href={'https://github.com/kaiotcp1'}>Github</Link></b></h1>
            </div>
            <div className='text-sm text-white'>
                <h1>My <b className='text-blue-300'><Link href={'https://www.linkedin.com/in/hpkaio/'}>Linkedin</Link></b></h1>
            </div>
            <div className='text-sm text-white'>
                <h1>Access <b className='text-blue-300'><Link href={'https://docs.stripe.com/testing'}>Payment tutorial</Link></b></h1>
            </div>

        </div>
    )
}

export default Footer