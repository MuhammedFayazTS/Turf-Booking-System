import { ArrowDownIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { datas } from './CardDataList'
import BookingTable from '../Table/BookingTable'
import { motion, spring } from 'framer-motion'
import { useSelector } from 'react-redux'
import UsersTable from '../Table/UsersTable'
import ChartContainer from './ChartContainer'
import VenueTable from '../Table/VenueTable'
import AnimatedNumbers from "react-animated-numbers";


function Dashboard() {
    const [cardCount, setCardCount] = useState([])
    const { users, bookings, venues } = useSelector(state => state.admin)

    useEffect(() => {
        let revenue = bookings.map(booking => booking.price).reduce((p1, p2) => p1 + p2, 0)
        setCardCount([bookings?.length, revenue, users?.length, venues?.length]);
    }, [users, bookings, venues]);




    return (
        <>
            <div className='w-full min-h-full max-h-fit bg-slate-200 ' >

                <div className="w-full flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0">

                    {
                        datas.map((item, index) => (
                            <motion.div
                                whileHover={{ y: -5 }} transition={{ duration: .3, type: spring }}
                                key={index} className="h-44 md:w-1/4 rounded-lg shadow-md bg-slate-50 flex flex-col justify-between p-6">
                                <div className="flex items-center justify-between">
                                    <h5 className='text-lg font-semibold text-slate-400'>{item.title}</h5>
                                    {item.Icon}
                                </div>
                                <div className="flex items-center">
                                    <p className="text-3xl font-bold text-slate-800">
                                        <AnimatedNumbers
                                            includeComma
                                            animateToNumber={cardCount[index]}
                                        />

                                    </p>
                                    {/* <div className="flex items-center text-red-500 ">
                                        <ArrowDownIcon className='w-3 h-3' />
                                        <p className="text-md font-medium">2.29%</p>
                                    </div> */}
                                </div>
                                <Link to={item.to}
                                    className='text-lg font-semibold text-sky-600 hover:text-sky-700' >{item.button}</Link>
                            </motion.div>
                        ))
                    }

                </div>

                <div className="w-full mt-8">
                    <ChartContainer />
                </div>

                <div className='w-full mt-8'>
                    <h3 className="text-2xl font-medium my-3">Latest Bookings</h3>
                    <BookingTable data={bookings} />
                </div>

                <div className='w-full mt-8'>
                    <h3 className="text-2xl font-medium my-3">Latest Joined Users</h3>
                    <UsersTable data={users} />
                </div>

                <div className='w-full mt-8'>
                    <h3 className="text-2xl font-medium my-3">Lates Venues</h3>
                    <VenueTable data={venues} />
                </div>

            </div>
        </>
    )
}

export default Dashboard