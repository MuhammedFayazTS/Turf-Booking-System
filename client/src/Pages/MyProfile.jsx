import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import { Avatar, Grid, GridItem } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { BellIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function MyProfile() {
    const { user } = useSelector(state => state.user)
    const location = useLocation();


    return (
        <>
            <div className='bg-slate-100 min-h-screen w-full'>

                <Header pos={'sticky'} />

                <div className='w-full py-10 px-5 md:px-20'>
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}>

                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .4, type: 'tween' }} viewport={{ once: true }}
                            colSpan={{ base: 4, md: 1 }}
                            w='100%' h={'550'}
                            className='bg-slate-50 border border-slate-300 flex flex-col items-center py-10 '
                            rounded={'xl'} >
                            <Avatar size={'xl'} name={user?.username} src={user?.image} />
                            <h3 className="mt-5 text-xl font-semibold">{user?.username}</h3>
                            <h6 className="text-md font-medium">{user?.phone}</h6>
                            <h6 className="text-sm">{user?.email}</h6>

                            <Link
                                to={'/my-profile'}
                                className={`mt-5 w-full py-3 px-6 flex items-center ${location.pathname === '/my-profile' ? 'bg-green-600  text-gray-50' : 'hover:bg-green-100 hover:text-gray-700 text-gray-800'
                                    } gap-x-6`}
                            >
                                <PencilIcon className="h-6 w-6" />
                                Edit Profile
                            </Link>

                            <Link
                                to={'/my-profile/my-bookings'}
                                className={`w-full py-3 px-6 flex items-center ${location.pathname === '/my-profile/my-bookings' ? 'bg-green-600  text-gray-50' : 'hover:bg-green-100 hover:text-gray-700 text-gray-800'
                                    } gap-x-6`}
                            >
                                <BookmarkIcon className="h-6 w-6" />
                                All Bookings
                            </Link>

                            <Link
                                to={'/my-profile/notifications'}
                                className={`w-full py-3 px-6 flex items-center ${location.pathname === '/my-profile/notifications' ? 'bg-green-600  text-gray-50' : 'hover:bg-green-100 hover:text-gray-700 text-gray-800'
                                    } gap-x-6`}
                            >
                                <BellIcon className="h-6 w-6" />
                                Notifications
                            </Link>

                        </GridItem>

                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .4, type: 'tween' }} viewport={{ once: true }}
                            w='100%' colSpan={{ base: 4, md: 3 }} minH={'400'}
                            className='bg-slate-50 border border-slate-300' rounded={'xl'} >
                            <Outlet />
                        </GridItem>

                    </Grid>
                </div>

            </div>
        </>
    )
}

export default MyProfile