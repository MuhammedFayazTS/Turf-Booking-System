import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import { Button, Divider, Grid, GridItem, IconButton, Input, Select, Tooltip } from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { CloseIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import TimeMenu from '../Components/MenuList/TimeMenu';
import { useDispatch, useSelector } from 'react-redux';
import { addToBooking, removeAllBooking, removeFromBooking } from '../redux/bookingSlice';
import { bookingAPI, getVenuDetailsAPI, makePaymentAPI } from '../Services/allAPIs';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import { setUser } from '../redux/userSlice';
import { motion } from 'framer-motion';
import {loadStripe} from '@stripe/stripe-js/pure';

function BookingPage() {
    const { bookings } = useSelector(state => state.booking)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const params = useParams()
    const [ownerInfo, setOwnerInfo] = useState({});
    const [venueInfo, setVenueInfo] = useState({});
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [sport, setSport] = useState('')

    const minDate = () => {
        const today = new Date();
        const localToday = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        return localToday;
    };

    // -----------Get organizer Info by id -----------  
    const getVenueInfoById = async () => {
        dispatch(showLoading())
        try {
            const res = await getVenuDetailsAPI(params.id)
            setVenueInfo(res.data)
            setOwnerInfo(res.data.userId)
            dispatch(hideLoading())

        } catch (error) {
            dispatch(hideLoading())
            console.log(error.message);
        }
    }

    // ----------handle payment--------------------
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51ObiDZSIKi9t6sa5bMEji89uLfYj1StviB7A6NCpLYBr1GcoRV7XejjHFMWod6AQ17R5oFL9uCQl8v0HXbORWNuZ00MCw7E5H8")
        const body = {
            products: bookings
        }
        try {
            const response = await makePaymentAPI(body)
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id
            })
            
            if (result.error) {
                console.log(result.error)
            }else{
                await handleBooking()
            }

        } catch (error) {
            console.log(error)
        }

    }



    // ------------BOOKING------------
    const handleBooking = async () => {
        dispatch(showLoading());

        try {
            // Loop through each booking and handle the booking logic
            for (const booking of bookings) {
                const res = await bookingAPI({
                    venueId: params.id,
                    ownerId: venueInfo.userId,
                    userId: user._id,
                    venueInfo: venueInfo,
                    userInfo: user,
                    date: booking.date,
                    time: booking.time,
                    sport: booking.sport,
                    price: booking.price
                    // ... other details
                });

                if (res.data.success) {
                    toast.success(res.data.message);
                    dispatch(setUser(res.data.user));
                } else {
                    toast.error(res.data.message);
                }
            }

            // Clear the bookings after successfully handling all of them
            dispatch(removeAllBooking());
            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
            console.log(error.message);
        }
    };


    // Function to generate the time range
    const generateTimeRange = (availableTimings, selectedTime) => {
        const index = availableTimings.findIndex(t => t === selectedTime);
        if (index !== -1 && index < availableTimings.length - 1) {
            return `${availableTimings[index]} - ${availableTimings[index + 1]}`;
        } else {
            return `${availableTimings[index]} - ${availableTimings[0]}`;
        }
    };


    // -------------Add to Cart-------------
    const handelAddToCart = () => {
        if (bookings.some(booking => booking.time == time && booking.date == date)) {
            toast("Already added to cart")
        } else {
            const convertTo24HourFormat = (timeString) => moment(timeString, 'hh:mm A').format('HH:mm');
            const startTime = convertTo24HourFormat('06:00 AM');
            const endTime = convertTo24HourFormat('06:00 PM');
            const bookedTime = convertTo24HourFormat(time);
            const noExtraCharges = moment(bookedTime, 'HH:mm').isBetween(moment(startTime, 'HH:mm'), moment(endTime, 'HH:mm'));

            let BookingDetails = {
                price: venueInfo.price,
                name: venueInfo.name,
                availableTimings: venueInfo.availableTimings,
                images:venueInfo?.images,
                time,
                date,
                sport
            }
            if (!noExtraCharges) {
                BookingDetails.price = venueInfo.price + venueInfo.lightsOn
            } else {
                BookingDetails.price = venueInfo.price
            }


            dispatch(addToBooking(BookingDetails))
        }
    }



    // -------------use Effect-------------
    useEffect(() => {
        getVenueInfoById()
        // getOwnerInfo()
    }, [params.id])



    return (
        <>
            <div className='bg-slate-100 min-h-screen'>
                <Header pos={'Sticky'} />
                <div className="flex  justify-center items-center w-full p-4 md:py-16 md:px-52">

                    <Grid className='w-full h-full' templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
                        <GridItem as={motion.div}
                            initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                            w='100%' h='fit-content'  >
                            <div className="w-full bg-white h-full flex flex-col  rounded-xl shadow-md border p-5 border-slate-300 gap-y-5">
                                <div className='flex items-center justify-between'>
                                    <h2 className="text-2xl font-bold text-slate-700">{venueInfo?.name}</h2>
                                    <h4 className=' text-gray-500 font-bold'>
                                        <span className="text-xl text-green-600">{venueInfo?.price}</span>/hr
                                        <Tooltip label={`extra ${venueInfo.lightsOn} for night`} fontSize='md'>
                                            <QuestionOutlineIcon className='ml-1' />
                                        </Tooltip>
                                    </h4>
                                </div>

                                <h2 className="text-md  text-slate-700">{venueInfo?.location}</h2>
                                <Divider />

                                <div className="flex justify-between">
                                    <label className='text-md font-medium'>Sports</label>
                                    <Select
                                        onChange={(e) => setSport(e.target.value)}
                                        maxW={'60%'} variant='outline'   >
                                        {/* Default option */}
                                        <option value="">Select a sport</option>
                                        {/* Dynamic options */}
                                        {
                                            venueInfo?.include?.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                                <div className="flex justify-between ">
                                    <label className='text-md font-medium'>Date</label>
                                    <Input onChange={(e) => setDate(e.target.value)} value={date} maxW={'60%'} type='date' min={minDate()} placeholder='Basic usage' />
                                </div>

                                <div className="flex justify-between ">
                                    <label className='text-md font-medium'>Time</label>
                                    {/* dropdown here */}
                                    <div className="relative inline-block w-[60%] z-30">
                                        <TimeMenu
                                            setSelectedTime={setTime} selectedTime={time}
                                            date={date}
                                            bookedTime={venueInfo?.notAvailableTimings} timeOptions={venueInfo?.availableTimings} />
                                    </div>
                                </div>

                                <Button
                                    isDisabled={
                                        time !== undefined &&
                                            time !== null &&
                                            time !== '' &&
                                            date !== undefined &&
                                            date !== null &&
                                            date !== ''
                                            ? false
                                            : true
                                    } colorScheme='whatsapp'
                                    onClick={handelAddToCart}
                                >Add to Cart</Button>

                            </div>
                        </GridItem>

                        {bookings.length > 0 &&

                            <GridItem as={motion.div}
                                initial={{ scale: .8 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                                w='100%' h={'fit-content'}  >
                                <div className="w-full bg-white h-full flex flex-col  rounded-xl shadow-md border p-5 border-slate-300 gap-y-5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold text-slate-700">Cart</h2>
                                        <IconButton
                                            onClick={() => dispatch(removeAllBooking())}
                                            variant={'ghost'} colorScheme='red'><TrashIcon className='w-6 h-6' /></IconButton>
                                    </div>

                                    {
                                        bookings.length > 0
                                        && bookings.map((booking, index) =>
                                        (
                                            <motion.div
                                                as={motion.div}
                                                initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: .3, type: 'tween' }} viewport={{ once: true }}
                                                key={index} className='h-full flex-col space-y-1'>
                                                <Divider />

                                                <div className='flex  flex-col gap-3'>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-md font-medium text-slate-700 ">
                                                            <span className='font-semibold'>{booking.name} </span>
                                                            •
                                                            {booking.sport}
                                                        </p>
                                                        <IconButton onClick={()=>dispatch(removeFromBooking(booking))}
                                                         size={'sm'} variant={'ghost'} colorScheme='red'><CloseIcon className='w-5 h-5' /></IconButton>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <p className="text-md font-medium text-slate-700 ">
                                                            {
                                                                moment(booking.date).format('DD,MMMM YYYY')
                                                            }
                                                        </p>
                                                        <p className="text-md font-medium text-slate-700 ">
                                                            {
                                                                generateTimeRange(booking.availableTimings, booking.time)
                                                            }
                                                        </p>
                                                    </div>

                                                    <p className="text-md font-medium text-slate-700 ">INR {booking.price}</p>
                                                </div>
                                            </motion.div>
                                        ))
                                    }

                                    <Button onClick={makePayment} size='lg' colorScheme='whatsapp'>
                                        Proceed INR {bookings?.map((item) => item.price).reduce((item1, item2) => item1 + item2)}
                                    </Button>

                                </div>
                            </GridItem>
                        }

                    </Grid>
                </div>
            </div>
        </>
    )
}

export default BookingPage