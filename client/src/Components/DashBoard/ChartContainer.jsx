import { Divider, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import { useSelector } from 'react-redux';
import {  getCountOfDates } from '../../Utils/getCountAccordingToDate';


function ChartContainer() {
    const { users, bookings, venues } = useSelector(state => state.admin)
    let bookingsThisWeek = Object.values(getCountOfDates(bookings)).map((count) => count.length)

    function getRevenuesOfWeek(bookings){
        let bookingsThisWeek = Object.values(getCountOfDates(bookings))
        let revenues = []
        for(let i in bookingsThisWeek){
            let revenue = bookingsThisWeek[i]?.map((booking) => booking?.price)
            revenues.push(revenue.length > 0? revenue.reduce((p1,p2)=>p1+p2) :revenue)
        }
        return revenues
    }


    return (
        <>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem w='100%' h={{ base: 'fit-content', md: '350' }} bg='white' shadow={'md'} rounded={'md'} p={3} >
                    <div className='flex flex-col h-full justify-center items-center gap-y-1'>
                        <h3 className="text-xl font-semibold text-gray-500">
                            Revenues this Week
                        </h3>
                        <Divider />
                        <LineChart  inData={getRevenuesOfWeek(bookings)} />
                    </div>
                </GridItem>
                <GridItem w='100%' h={{ base: 'fit-content', md: '350' }} bg='white' shadow={'md'} rounded={'md'} p={3} >
                    <div className='flex flex-col h-full justify-center items-center gap-y-1'>
                        <h3 className="text-xl font-semibold text-gray-500">
                            Bookings this Week
                        </h3>
                        <Divider />
                        <BarChart inData = {bookingsThisWeek}  />
                    </div>
                </GridItem>
            </Grid>
        </>
    )
}

export default ChartContainer