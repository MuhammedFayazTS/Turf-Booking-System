import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import BookingSummaryTable from '../Components/Table/BookingSummaryTable'
import { motion } from 'framer-motion'
import { allVenueBookingsAPI } from '../Services/allAPIs'
import { useSelector } from 'react-redux'

function BookingSummary() {
    const [allBookings, setAllBookings] = useState([])
    const { user } = useSelector(state => state.user)


    const getAllUserBookings = async () => {
        try {
            const response = await allVenueBookingsAPI()
            if (response) {
                setAllBookings(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUserBookings()
    }, [])

    return (
        <>
            <div className='min-h-screen bg-slate-100'>
                <Header pos={'sticky'} />

                <motion.div
                    initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .2, type: 'spring' }} viewport={{ once: true }}
                    className='w-full p-8 flex flex-col items-center gap-5'>
                    <div className="md:w-5/6 flex flex-col md:flex-row justify-between items-center gap-y-5">
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold">Booking Summary</h3>
                            <p className="text-md">Efficiently manage and track all your upcoming bookings.</p>
                        </div>
                        <InputGroup w={{ base: '100%', md: '30%' }} rounded={'md'} >
                            <InputRightElement className='p-2' pointerEvents='none'>
                                <MagnifyingGlassIcon color='gray.300' />
                            </InputRightElement>
                            <Input variant={'filled'} bg={'white'} borderColor={'gray.300'} type='search' placeholder='Search' />
                        </InputGroup>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded w-full md:w-5/6">
                        <BookingSummaryTable data={allBookings} />
                    </div>

                </motion.div>

            </div>
        </>
    )
}

export default BookingSummary