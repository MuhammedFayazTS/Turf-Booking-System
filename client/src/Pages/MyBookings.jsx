import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import { Input, InputGroup, InputRightElement, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import BookingTable from '../Components/Table/BookingTable'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { allUserBookingsAPI } from '../Services/allAPIs'

function MyBookings() {
  const { user } = useSelector(state => state.user)
  const [allBookings, setAllBookings] = useState([])
  const [status,setStatus] = useState('')

  const getAllUserBookings = async () => {
    try {
      const response = await allUserBookingsAPI(status)
      if (response) {
        setAllBookings(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUserBookings()
  }, [status])

  return (
    <>
      <div className='bg-slate-50 h-full w-full rounded-xl'>

        <Tabs variant='unstyled' align='center' p={{base:0,md:3}}>
          <TabList  className='bg-gray-200 md:p-2 rounded-md w-fit'>
            <Tab onClick={(e)=>setStatus('')} 
             _selected={{ color: 'white', rounded: 'lg', bg: '#22C55E' }}  >All</Tab>
            <Tab onClick={(e)=>setStatus('success')}  
             _selected={{ color: 'white', rounded: 'lg', bg: '#22C55E' }}  >Success</Tab>
            <Tab onClick={(e)=>setStatus('pending')}  
             _selected={{ color: 'white', rounded: 'lg', bg: '#22C55E' }}  >Pending</Tab>
            <Tab onClick={(e)=>setStatus('failed')}  
             _selected={{ color: 'white', rounded: 'lg', bg: '#22C55E' }}  >Failed</Tab>
          </TabList>

          <TabPanels w={'100%'} overflowX={'auto'} >
            <TabPanel>
              <BookingTable data={allBookings} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
              <BookingTable data={allBookings} />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
              <BookingTable data={allBookings} />
            </TabPanel>
            <TabPanel>
              <p>Four!</p>
              <BookingTable data={allBookings} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}

export default MyBookings