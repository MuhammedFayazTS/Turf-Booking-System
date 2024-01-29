import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import BookingTable from '../Table/BookingTable'
import LineChart from '../Charts/LineChart'
import { useSelector } from 'react-redux'
import { getCountOfDates } from '../../Utils/getCountAccordingToDate'
import moment from 'moment'

function RevenueSection() {
    const { bookings } = useSelector(state => state.admin)

    function getRevenuesOfWeek(bookings) {
        let bookingsThisWeek = Object.values(getCountOfDates(bookings))
        let revenues = []
        for (let i in bookingsThisWeek) {
            let revenue = bookingsThisWeek[i]?.map((booking) => booking?.price)
            revenues.push(revenue.length > 0 ? revenue.reduce((p1, p2) => p1 + p2) : revenue)
        }
        return revenues
    }

    const getRevenueForDate = (date, bookings) => {
        if (date === 'today') {
            let bookingsToday = bookings?.filter(booking => moment(booking.createdAt).isSame(moment(), 'day'));
            let revenues = bookingsToday.map(booking => booking.price)
            return revenues.length > 0 ? revenues.reduce((p1, p2) => p1 + p2) : revenues
        } else if (date == 'thisWeek') {
            let revenueThisWeek = getRevenuesOfWeek(bookings)
            let revenues = revenueThisWeek.length>0?revenueThisWeek.reduce((p1, p2) => p1 + p2) : revenueThisWeek
            return revenues
        } else if (date == 'thisMonth') {
            let bookingsThisMonth = bookings?.filter(booking => moment(booking.createdAt).isBetween(moment().startOf('month'), moment().endOf('month'), null, '[]'))
            let revenues = bookingsThisMonth.map(booking => booking.price)
            return revenues.length > 0 ? revenues.reduce((p1, p2) => p1 + p2) : revenues
        } else {
            let revenues = bookings.map(booking => booking.price)
            return revenues.length > 0 ? revenues.reduce((p1, p2) => p1 + p2) : revenues
        }
    }


    return (
        <>
            <div className='w-full min-h-full max-h-fit bg-slate-200 flex flex-col space-y-3' >
                <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(3, 1fr)'}} gap={6}>
                    <GridItem colSpan={2} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full justify-center items-center gap-y-1'>
                            <LineChart inData={getRevenuesOfWeek(bookings)} />
                        </div>
                    </GridItem>
                    <GridItem colSpan={1} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full items-center gap-y-1 py-3'>
                            <h3 className="text-2xl font-semibold">
                                Total Revenue
                            </h3>
                            <table className='w-full border-2 mt-4 h-full'>
                                <thead className='bg-green-500 text-white'>
                                    <tr>
                                        <th className='border-2'></th>
                                        <th className='border-2'>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>Today:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getRevenueForDate('today', bookings)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Week:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getRevenueForDate('thisWeek', bookings)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Month:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getRevenueForDate('thisMonth', bookings)}
                                        </td>

                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>All Bookings:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getRevenueForDate('all', bookings)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                    <GridItem colSpan={3} w='100%' h={'fit-content'} bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <BookingTable data={bookings} />
                    </GridItem>
                </Grid>
            </div>
        </>
    )
}

export default RevenueSection