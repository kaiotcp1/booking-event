import React from 'react'

interface StepsProps {
    stepNames: string[],
    stepsContent: React.ReactNode[],
    activeStep: number
}

const Steps = ({ stepNames, stepsContent, activeStep }: StepsProps) => {
    return (
        <div>
            <div className='flex justify-between'>
                {stepNames.map((stepName, index) => {
                    const isActiveStep = index === activeStep;
                    return (
                        <div className='flex flex-col gap-5 items-center md:p-10 p-2 text-white md:text-black' key={index}>
                            <div className="flex">
                                <div className={`shadow-md h-5 w-5 rounded-full flex justify-center items-center ${activeStep >= index ?
                                    "bg-slate-500 text-white" : "bg-gradient-to-r from-gray-700 to-slate-800 text-gray-100"}
                            `}>
                                    {index + 1}
                                </div>
                            </div>
                            <h1 className='text-slate=700 font-semibold'>{stepName}</h1>
                        </div>
                    );
                })}
            </div>
            <div className="mt-5">
                {stepsContent[activeStep]}
            </div>
        </div>
    );
}

export default Steps