import React from 'react'
import { Badge, IconButton, Image } from '@chakra-ui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import moment from 'moment'

function VenueTable({ data }) {
    return (
        <>
            <motion.div
                initial={{ scale: .85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .4, type: 'spring' }} viewport={{ once: true }}
            >
                <table className=" w-full text-sm text-left rtl:text-right text-slate-500 shadow-md border">
                    <thead className={`text-xs uppercase  text-slate-200 bg-green-500 `}>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Venue Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Join Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.length > 0 &&
                            data.map((venue, index) => (
                                <tr key={index} className="bg-white border hover:bg-slate-100 transition-colors ease-in-out ">
                                    <td scope="row" className="flex flex-col  md:flex-row md:items-center gap-y-2 px-6 py-4 text-slate-900 whitespace-nowrap dark:text-white">
                                        <Image
                                            boxSize='60px'
                                            objectFit='cover'
                                            src={venue?.images[0]}
                                            alt={venue?.name}
                                        />
                                        <div className="md:ps-3">
                                            <div className="text-base font-semibold text-slate-700">
                                                {venue?.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {venue?.email}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {venue?.price}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {moment(venue?.createdAt).format('DD-MM-YYYY')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <IconButton isRound variant={'solid'} colorScheme='gray' >
                                            <EllipsisHorizontalIcon className="h-7 w-7" />
                                        </IconButton>
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

export default VenueTable