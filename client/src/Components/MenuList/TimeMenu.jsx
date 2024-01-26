import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';

function TimeMenu({selectedTime,setSelectedTime,timeOptions,date,bookedTime}) {
    const [isOpen, setIsOpen] = useState(false);

    const bookingCheck = (timeOption) => {
        // Assuming bookedTime is an array of objects containing date and time properties
        return bookedTime.some(data => data.date === date && data.time === timeOption);
      };
      

    return (
        <>
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white border border-gray-300 rounded-md py-2 px-4 w-full flex justify-between items-center focus:outline-none"
                    >
                        {selectedTime?selectedTime:'--select-time--'}
                        {isOpen?
                        <XMarkIcon className='h-6 w-6' />:
                        <ClockIcon className="h-6 w-6" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="absolute z-20 bg-white shadow-md rounded-md mt-2 w-full flex flex-wrap p-2 gap-2 h-60 overflow-y-scroll">
                        {timeOptions.map((time, index) => (
                            <Button
                                isDisabled={bookingCheck(time)}
                                w={{base:'47%',md:'48%'}}
                                py={5}
                                colorScheme='green'
                                variant={selectedTime == time ? 'solid' : 'outline'}
                                size={{base:'xs',md:'sm'}}
                                key={index}
                                onClick={() => {
                                    setSelectedTime(time);
                                    setIsOpen(false);
                                }}
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                )}
                
        </>
    )
}

export default TimeMenu