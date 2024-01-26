import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import BarChart from '../Charts/BarChart'
import BookingTable from '../Table/BookingTable'
import { useSelector } from 'react-redux'
import { getCountOfDates } from '../../Utils/getCountAccordingToDate'
import moment from 'moment'
import BookingSummaryTable from '../Table/BookingSummaryTable'

function BookingSection() {
    const { bookings } = useSelector(state => state.admin)
    let bookingsThisWeek = Object.values(getCountOfDates(bookings)).map((count) => count.length)

    const getBookingsForDate = (date, bookings) => {
        if (date == 'today') {
            let bookingsToday =  bookings?.filter(booking => moment(booking.createdAt).isSame(moment(), 'day'))
            return bookingsToday.length
        } else if (date == 'thisWeek') {
            return bookingsThisWeek.length>0? bookingsThisWeek.reduce((count1, count2) => count1 + count2):0
        }  else if (date == 'thisMonth') {
            let bookingsThisMonth =  bookings?.filter(booking => moment(booking.createdAt).isBetween(moment().startOf('month'), moment().endOf('month'), null, '[]'))
            return bookingsThisMonth.length
        }else{
            return bookings.length
        }
    }

    return (
        <>
            <div className='w-full min-h-full max-h-fit bg-slate-200 flex flex-col space-y-3' >
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    <GridItem colSpan={2} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full justify-center items-center gap-y-1'>
                            <BarChart inData={bookingsThisWeek} />
                        </div>
                    </GridItem>

                    <GridItem colSpan={1} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full items-center gap-y-1 py-3'>
                            <h3 className="text-2xl font-semibold">
                                Total Bookings
                            </h3>
                            <table className='w-full border-2 mt-4 h-full'>
                                <thead className='bg-green-500 text-white'>
                                    <tr>
                                        <th className='border-2'></th>
                                        <th className='border-2'>No.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>Today:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getBookingsForDate('today', bookings)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Week:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getBookingsForDate('thisWeek', bookings)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Month:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getBookingsForDate('thisMonth', bookings)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>All Bookings:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getBookingsForDate('all', bookings)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                    <GridItem colSpan={3} w='100%' minH='350' h={'fit-content'} bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <BookingSummaryTable isAdminPage data={bookings} />
                    </GridItem>
                </Grid>
            </div>
        </>
    )
}

export default BookingSection