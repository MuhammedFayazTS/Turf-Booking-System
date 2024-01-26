import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import BarChart from '../Charts/BarChart'
import DoughnutChart from '../Charts/DoughnutChart'
import UsersTable from '../Table/UsersTable'
import { useSelector } from 'react-redux'
import moment from 'moment'

function UserMangementSection() {
    const { users } = useSelector(state => state.admin)

    const userCount = (users)=>{
        let typeCount ={
            owners:0,
            users:0
        }
        typeCount.owners = users.filter(user => user.isOwner === true).length
        typeCount.users = users.filter(user => user.isOwner === false).length
        return typeCount
    }

    const getUsersJoinedInDate = (date, users) => {
        if (date == 'today') {
            let usersJoinedToday = users?.filter(user => moment(user.createdAt).isSame(moment(), 'day'))
            return usersJoinedToday.length
        } else if (date == 'thisWeek') {
            let startOfWeek = moment().startOf('week');
            let endOfWeek = moment().endOf('week');
            let usersJoinedThisWeek = users?.filter(user => moment(user.createdAt).isBetween(startOfWeek, endOfWeek, null, '[]'));
            return usersJoinedThisWeek.length;
        } else if (date == 'thisMonth') {
            let usersJoinedThisMonth = users?.filter(user => moment(user.createdAt).isBetween(moment().startOf('month'), moment().endOf('month'), null, '[]'))
            return usersJoinedThisMonth.length
        } else {
            return users.length
        }
    }
    

    return (
        <>
            <div className='w-full min-h-full max-h-fit bg-slate-200 flex flex-col space-y-3' >
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    <GridItem colSpan={2} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full justify-center items-center gap-y-1'>
                            <DoughnutChart inData={userCount(users)} />
                        </div>
                    </GridItem>

                    <GridItem colSpan={1} w='100%' h='350' bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <div className='flex flex-col w-full h-full items-center gap-y-1 py-3'>
                            <h3 className="text-2xl font-semibold">
                                Total Users Joined
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
                                            {getUsersJoinedInDate('today', users)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Week:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getUsersJoinedInDate('thisWeek', users)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>This Month:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getUsersJoinedInDate('thisMonth', users)}
                                        </td>
                                    </tr>
                                    <tr className='hover:bg-gray-100'>
                                        <td className='px-3'>All usersJoined:</td>
                                        <td className='border-l-2 px-3 text-center'>
                                            {getUsersJoinedInDate('all', users)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                    <GridItem colSpan={3} w='100%'minH='350' h={'fit-content'} bg='white' shadow={'md'} rounded={'md'} p={3} >
                        <UsersTable data={users} />
                    </GridItem>
                </Grid>
            </div>
        </>
    )
}

export default UserMangementSection