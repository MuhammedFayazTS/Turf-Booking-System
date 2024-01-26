import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import ShortCarousel from '../Components/Swiper/ShortCarousel'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Divider, Grid, GridItem } from '@chakra-ui/react'
import { CalendarDaysIcon, CheckCircleIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import CourtPriceSlider from '../Components/Swiper/CourtPriceSlider'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'
import { getVenuDetailsAPI } from '../Services/allAPIs'
import { addBookingData } from '../redux/bookingSlice'
import { motion } from 'framer-motion'
import Rating from '../Components/Reviews & Rating/Rating'
import Reviews from '../Components/Reviews & Rating/Reviews'

function VenueDisplay() {
    const navigation = useNavigate()
    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch()
    const [venueDetails, setVenueDetails] = useState({})
    const { id } = useParams()

    const getVenueDetails = async () => {
        dispatch(showLoading())
        try {
            const response = await getVenuDetailsAPI(id);
            if (response) {
                setVenueDetails(response.data)
                dispatch(hideLoading())
            } else {
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    // for adding it to bookings list
    const addToBookingPage = () => {
        navigation(`/cart/${id}`)
    }

    useEffect(() => {
        getVenueDetails()
    }, [id])

    return (
        <>
            <div className='bg-slate-50'>
                <Header pos={'sticky'} />
                <ShortCarousel images={venueDetails?.images} />


                <div className='flex flex-col items-center mt-5 py-5 space-y-2'>

                    {/* details sec */}
                    <div className="w-11/12  p-3 flex">
                        <div className='flex flex-col'>
                            <motion.h2
                                initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                                className="text-2xl md:text-3xl font-bold">
                                {venueDetails?.name}
                            </motion.h2>
                            <motion.div
                                initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                                className='flex flex-wrap items-center gap-2'>
                                <Link className="text-sm md:text-md">
                                    <PhoneIcon /> {venueDetails?.phone}
                                </Link>
                                <Link className="text-sm md:text-md">
                                    <EmailIcon /> {venueDetails?.email}
                                </Link>
                                <Link className="text-sm md:text-md flex items-center">
                                    <MapPinIcon className='w-4 h-4' /> {venueDetails?.location}
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    <Divider width={'85%'} borderWidth={'1px'} />

                    <div className='flex flex-col md:flex-row md:w-11/12 p-3 justify-between'>
                        <motion.h4
                            initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            className="text-md md:text-lg ">
                            Venue type: <span className="text-emerald-600">Indoor</span>
                        </motion.h4>
                        <motion.h3
                            initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            className="text-md md:text-lg ">
                            Starts from: <span className="text-emerald-600 text-2xl font-semibold">{venueDetails?.price}Rs/hr</span>
                        </motion.h3>
                    </div>

                    <Grid
                        w={'90%'}
                        minH={{ base: 'auto', md: '60vh' }}
                        templateRows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(6, 1fr)' }}
                        gap={4}
                    >
                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            rounded={'lg'} colSpan={{ base: 6, md: 4 }} bg='white' shadow={'lg'} >
                            <div className="w-full flex flex-col gap-y-2 p-5">
                                <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">
                                    Overview
                                </h4>
                                <Divider />
                                <p className='text-md'>{venueDetails.overview}</p>
                            </div>
                        </GridItem>

                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            order={{ base: 3, md: 0 }} rounded={'lg'} rowSpan={2} colSpan={{ base: 6, md: 2 }} bg='white' shadow={'lg'} >
                            <div className="w-full flex flex-col gap-y-3 p-5">
                                <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">
                                    Book A Court
                                </h4>
                                <Divider />
                                <h4 className="text-lg  p-2 ">
                                    <span className='font-semibold'>{venueDetails.name}, </span>
                                    is available for booking.
                                </h4>
                                <CourtPriceSlider price={venueDetails.price} lightsOn={venueDetails.lightsOn} />
                                <Button
                                    onClick={addToBookingPage}
                                    colorScheme='green'
                                    leftIcon={<CalendarDaysIcon className='w-5 h-5' />}>
                                    Book Now
                                </Button>
                            </div>
                        </GridItem>

                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            rounded={'lg'} rowSpan={1} colSpan={{ base: 6, md: 2 }} bg='white' shadow={'lg'} >
                            <div className="w-full flex flex-col gap-y-3 p-5">
                                <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">
                                    Includes
                                </h4>
                                <Divider />
                                <div className="w-full flex flex-wrap gap-3">
                                    {
                                        venueDetails.include?.length > 0 && venueDetails.include?.map((item, index) => (
                                            <div key={index} className="p-3 bg-slate-50 rounded flex items-center gap-x-1 text-sm shadow">
                                                <CheckBadgeIcon className="h-5 w-5 text-gray-500" />
                                                {item}
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </GridItem>

                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            rounded={'lg'} rowSpan={1} colSpan={{ base: 6, md: 2 }} bg='white' shadow={'lg'} >
                            <div className="w-full flex flex-col gap-y-3 p-5">
                                <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">
                                    Amenities
                                </h4>
                                <Divider />
                                <div className="w-full flex flex-wrap gap-8  ">
                                    {
                                        venueDetails.amenities?.length > 0 && venueDetails.amenities?.map((item, index) => (
                                            <div key={index} className="flex gap-x-1 text-sm items-center">
                                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                {item}
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </GridItem>

                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            rounded={'lg'} rowSpan={1} colSpan={6} bg='white' shadow={'lg'}
                        >
                                <div className='grid grid-cols-2 gap-6 px-10 py-16'>
                                        <Rating />
                                        <Reviews />
                                </div>

                        </GridItem>

                    </Grid>

                </div>
            </div>
        </>
    )
}

export default VenueDisplay