'use client'
import Steps from '@/components/Steps'
import React from 'react'
import General from './General'
import LocationAndDate from './LocationAndDate'
import Media from './Media'
import Tickets from './Tickets'

const EventForm = () => {

    const [activeStep = 0, setActiveStep] = React.useState(0);

    return (
        <div className=''>
            <Steps
                stepNames={['General', 'Location & Date', 'Media', 'Tickets']}
                stepsContent={[<General />, <LocationAndDate />, <Media />, <Tickets />]}
                activeStep={activeStep}
            />

        </div>
    )
}

export default EventForm