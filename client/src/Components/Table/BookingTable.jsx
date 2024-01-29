import {  Badge, IconButton, Image } from '@chakra-ui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import moment from 'moment'
import React from 'react'
import {  useSelector } from 'react-redux'
import TableMenuForAdmin from '../Menu/TableMenuForAdmin'
import DeleteBookings from '../Modals/DeleteModalContents/DeleteBookings'

function BookingTable({ data }) {

    const { user } = useSelector(state => state.user)
    

    const setColorByStatus = (status) => {
        if (status == 'success') {
            return 'green'
        } else if (status == 'failed') {
            return 'red'
        } else {
            return 'yellow'
        }
    }

    return (
        <>
        

            <motion.div
                initial={{ scale: .85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .4, type: 'spring' }} viewport={{ once: true }}
            >
                <table className=" w-full text-sm text-left rtl:text-right text-slate-500 shadow-md border">
                    <thead className="text-xs uppercase bg-green-500 text-slate-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Court Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Booked User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date & Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.length > 0 &&
                            data.map((booking, index) => (
                                <tr key={index} className="bg-white border hover:bg-slate-100 transition-colors ease-in-out ">
                                    <td scope="row" className="flex flex-col  md:flex-row md:items-center gap-y-2 px-6 py-4 text-slate-900 whitespace-nowrap dark:text-white">
                                        <Image
                                            boxSize='60px'
                                            objectFit='cover'
                                            src={booking?.venueInfo?.images[0]}
                                            alt={booking?.venueInfo?.name}
                                        />
                                        <div className="md:ps-3">
                                            <div className="text-base font-semibold text-slate-700">
                                                {booking?.venueInfo?.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{booking?.userInfo}</p>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <ul>
                                            <li>
                                                {moment(booking?.date).format('DD-MM-YYYY')}
                                            </li>
                                            <li>
                                                {booking?.time}
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Badge colorScheme={setColorByStatus(booking?.status)} py={1} px={2}>{booking?.status}</Badge>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        <p className="text-lg text-slate-950 font-semibold">
                                            INR {booking?.price}
                                        </p>
                                    </td> */}
                                    <td className="px-6 py-4">
                                        {
                                        user?.isAdmin ?
                                        <TableMenuForAdmin  isNotEditable  
                                        deleteModalContent={<DeleteBookings data={booking} />}
                                        />
                                        :
                                        <IconButton isRound variant={'solid'} colorScheme='gray' >
                                            <EllipsisHorizontalIcon className="h-7 w-7" />
                                        </IconButton>
                                        }
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </motion.div>
        </>
    )
}

export default BookingTable