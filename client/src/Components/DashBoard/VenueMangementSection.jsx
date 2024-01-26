import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import BarChart from '../Charts/BarChart'
import BookingTable from '../Table/BookingTable'
import DoughnutChart from '../Charts/DoughnutChart'
import UsersTable from '../Table/UsersTable'
import PieChart from '../Charts/PieChart'
import { useSelector } from 'react-redux'
import moment from 'moment'
import VenueTable from '../Table/VenueTable'

function VenueMangementSection() {

    const { venues } = useSelector(state => state.admin)

    const venueCount = (venues) => {
        let typeCount = new Map()
        for (let i of venues) {
            for (let j of i.include) {
                if (typeCount.has(j)) {
                    typeCount.set(j, typeCount.get(j) + 1);
                } else {
                    typeCount.set(j, 1)
                }
            }
        }
        const typeCountObjects = Object.fromEntries(typeCount);
        return typeCountObjects
    }

    const getVenuesJoinedInDate = (date, users) => {
        if (date == 'today') {
            let venuesJoinedToday = venues?.filter(venue => moment(venue.createdAt).isSame(moment(), 'day'))
            return venuesJoinedToday.length
        } else if (date == 'thisWeek') {
            let startOfWeek = moment().startOf('week');
            let endOfWeek = moment().endOf('week');
            let venuesJoinedThisWeek = venues?.filter(venue => moment(venue.createdAt).isBetween(startOfWeek, endOfWeek, null, '[]'));
            return venuesJoinedThisWeek.length;
        } else if (date == 'thisMonth') {
            let venuesJoinedThisMonth = venues?.filter(venue => moment(venue.createdAt).isBetween(moment().startOf('month'), moment().endOf('month'), null, '[]'))
            return venuesJoinedThisMonth.length
        } else {
            return venues.length
        }
    }

    return (
        <>
            <div className='w-full min-h-full max-h-fit bg-slate-200 flex flex-col space-y-3' >
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    <GridItem colSpan={2} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full justify-center items-center gap-y-1'>
                            <PieChart inData={venueCount(venues)} />
                        </div>
                    </GridItem>

                    <GridItem colSpan={1} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full items-center gap-y-1 py-3'>
                            <h3 className="text-2xl font-semibold">
                                Total Venues Added
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
                                            {getVenuesJoinedInDate('today', venues)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Week:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getVenuesJoinedInDate('thisWeek', venues)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Month:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getVenuesJoinedInDate('thisMonth', venues)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>All Venues:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getVenuesJoinedInDate('all', venues)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                    
                    <GridItem colSpan={3} w='100%' minH='380'  bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <VenueTable data={venues} />
                    </GridItem>
                </Grid>
            </div>
        </>
    )
}

export default VenueMangementSection