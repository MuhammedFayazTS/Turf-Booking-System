import React, { useCallback, useEffect, useState } from 'react';
import Header from '../core/Header/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Button, Divider, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getTurfDetails } from '../../redux/slices/turf.slice';
import Loader from '../core/loader/Loader';
import { CalendarDaysIcon, CheckBadgeIcon, CheckCircleIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ShortCarousel from '../content/carousel/ShortCarousel';
import NotFoundFallback from '../content/fallback/NotFoundFallback';
import PriceDisplaySlider from '../content/carousel/PriceDisplaySlider';
import Reviews from '../content/review_and_rating/Reviews';
import RatingWrapper from '../content/review_and_rating/RatingWrapper';
import { getDistanceToTurf } from '../../redux/slices/location.slice';

function TurfDisplay() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { turfDetails, loading } = useSelector((state) => state.turf);
  const { location, loading: locationLoading, distanceToTurf } = useSelector((state) => state.location);

  // for adding it to bookings list
  const addToBookingPage = () => {
    navigation(`/cart/${id}`);
  };

  const calculateDistance = useCallback(async () => {
    if (!turfDetails || !turfDetails.location || !location) {
      return;
    }

    const origin = location;
    const { coordinates: destination } = turfDetails.location;

    if (!origin || !destination) {
      return;
    }

    await dispatch(getDistanceToTurf({ origin, destination }));
  }, [dispatch, location, turfDetails]);

  useEffect(() => {
    dispatch(getTurfDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    calculateDistance();
  }, [calculateDistance, dispatch, id]);

  return (
    <>
      <div className="bg-slate-50">
        <Header pos={'sticky'} />
        <ShortCarousel images={turfDetails?.images} />

        {loading ? (
          <Loader />
        ) : !turfDetails ? (
          <NotFoundFallback message={'We can&apos;t find the turf'} />
        ) : (
          <div className="flex flex-col items-center mt-5 py-5 space-y-2">
            <div className="w-11/12  p-3 flex">
              <div className="flex flex-col">
                <motion.h2
                  initial={{ x: -50 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.3, type: 'tween' }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  {turfDetails?.name}
                </motion.h2>
                <motion.div
                  initial={{ x: 50 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.3, type: 'tween' }}
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center gap-2"
                >
                  <Link target="blank" to={'tel:' + turfDetails?.phone} className="text-sm md:text-md">
                    <PhoneIcon /> {turfDetails?.phone}
                  </Link>
                  <Link target="blank" to={'mailto:' + turfDetails?.email} className="text-sm md:text-md">
                    <EmailIcon /> {turfDetails?.email}
                  </Link>
                  <Link
                    target="blank"
                    to={`https://maps.google.com/maps?q=${encodeURIComponent(turfDetails?.location?.name)}`}
                    className="text-sm md:text-md flex items-center"
                  >
                    <MapPinIcon className="w-4 h-4" /> {turfDetails?.location?.name}
                  </Link>
                </motion.div>
              </div>
            </div>

            <Divider width={'85%'} borderWidth={'1px'} />

            <div className="flex flex-col md:flex-row md:w-11/12 p-3 justify-between">
              {locationLoading ? (
                <span className="w-full h-8 rounded bg-gray-100 text-gray-100">Loading...</span>
              ) : (
                <motion.p
                  initial={{ x: -50 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.3, type: 'tween' }}
                  viewport={{ once: true }}
                  className="text-md md:text-lg "
                >
                  {/*TODO: add a field in turfs to make it indoor or outdoor  */}
                  {/* Venue type: <span className="text-emerald-600">Indoor</span> */}
                  Distance to Turf: <span className="text-emerald-600 mr-3">{distanceToTurf?.distance?.text}</span>
                  Estimated Travel Time: <span className="text-emerald-600">{distanceToTurf?.duration?.text}</span>
                </motion.p>
              )}
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                className="text-md md:text-lg "
              >
                Starts from: <span className="text-emerald-600 text-2xl font-semibold">{turfDetails?.price}Rs/hr</span>
              </motion.h3>
            </div>

            <Grid
              w={'90%'}
              minH={{ base: 'auto', md: '60vh' }}
              templateRows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(6, 1fr)' }}
              gap={4}
            >
              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={{ base: 1, md: 1 }}
                rounded={'lg'}
                colSpan={{ base: 6, md: 4 }}
                bg="white"
                shadow={'lg'}
              >
                <div className="w-full flex flex-col gap-y-2 p-5">
                  <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">Overview</h4>
                  <Divider />
                  <p className="text-md">{turfDetails?.overview}</p>
                </div>
              </GridItem>

              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={{ base: 4, md: 2 }}
                rounded={'lg'}
                rowSpan={2}
                colSpan={{ base: 6, md: 2 }}
                bg="white"
                shadow={'lg'}
              >
                <div className="w-full flex flex-col gap-y-3 p-5">
                  <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">Book A Court</h4>
                  <Divider />
                  <h4 className="text-lg  p-2 ">
                    <span className="font-semibold">{turfDetails?.name}, </span>
                    is available for booking.
                  </h4>
                  <PriceDisplaySlider price={turfDetails?.price} additionalCharge={turfDetails?.additionalCharge} />
                  <Button
                    onClick={addToBookingPage}
                    colorScheme="green"
                    leftIcon={<CalendarDaysIcon className="w-5 h-5" />}
                  >
                    Book Now
                  </Button>
                </div>
              </GridItem>

              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={{ base: 2, md: 3 }}
                rounded={'lg'}
                rowSpan={1}
                colSpan={{ base: 6, md: 2 }}
                bg="white"
                shadow={'lg'}
              >
                <div className="w-full flex flex-col gap-y-3 p-5">
                  <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">Includes</h4>
                  <Divider />
                  <div className="w-full flex flex-wrap gap-3">
                    {turfDetails?.sportsId?.length > 0 &&
                      turfDetails?.sportsId?.map((sport, index) => (
                        <div
                          key={sport._id}
                          className="p-3 bg-slate-50 rounded flex items-center gap-x-1 text-sm shadow"
                        >
                          <CheckBadgeIcon className="h-5 w-5 text-gray-500" />
                          {sport.name}
                        </div>
                      ))}
                  </div>
                </div>
              </GridItem>

              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={{ base: 3, md: 4 }}
                rounded={'lg'}
                rowSpan={1}
                colSpan={{ base: 6, md: 2 }}
                bg="white"
                shadow={'lg'}
              >
                <div className="w-full flex flex-col gap-y-3 p-5">
                  <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">Amenities</h4>
                  <Divider />
                  <div className="w-full flex flex-wrap gap-8  ">
                    {turfDetails?.amenitiesId?.length > 0 &&
                      turfDetails?.amenitiesId?.map((amenity, index) => (
                        <div key={amenity._id} className="flex gap-x-1 text-sm items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          {amenity.name}
                        </div>
                      ))}
                  </div>
                </div>
              </GridItem>

              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={5}
                rounded={'lg'}
                rowSpan={1}
                colSpan={4}
                bg="white"
                shadow={'lg'}
              >
                <div className="w-full flex flex-col gap-y-3 p-5">
                  <h4 className="text-2xl font-semibold bg-slate-50 p-2 rounded">Time Slots</h4>
                  <Divider />
                  <div className="w-full flex flex-wrap gap-8  ">
                    {turfDetails?.timingsId?.length > 0 &&
                      turfDetails?.timingsId?.map((timing, index) => (
                        <div
                          key={timing._id}
                          className="p-3 bg-slate-50 rounded flex items-center gap-x-1 text-sm shadow"
                        >
                          {timing.startTime}
                        </div>
                      ))}
                  </div>
                </div>
              </GridItem>

              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={5}
                rounded={'lg'}
                rowSpan={1}
                colSpan={2}
                bg="white"
                shadow={'lg'}
              >
                <div className="m-5">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.6525745898657!2d${turfDetails?.location?.latitude}!3d${turfDetails?.location?.longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080fa1fda5b5b3%3A0x44ac4eefb4130c8a!2sVeliyathunadu%2C%20Kerala%20683511!5e0!3m2!1sen!2sin!4v1721459336607!5m2!1sen!2sin`}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </GridItem>

              <GridItem
                as={motion.div}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'tween' }}
                viewport={{ once: true }}
                order={5}
                rounded={'lg'}
                rowSpan={1}
                colSpan={6}
                bg="white"
                shadow={'lg'}
              >
                <div className="grid md:grid-cols-2 gap-6 px-10 py-16">
                  <RatingWrapper rating={turfDetails?.rating} />
                  <Reviews ratings={turfDetails?.rating?.ratings} />
                </div>
              </GridItem>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
}

export default TurfDisplay;
