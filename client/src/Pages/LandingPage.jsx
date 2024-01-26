import React, { useEffect, useState } from 'react'
import { getFeaturedVenuesAPI, getUserInfoByIdToken } from '../Services/allAPIs'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertSlice'
import Header from '../Components/Header/Header'
import {
  Button,
  ButtonGroup
} from '@chakra-ui/react'
import {  CheckBadgeIcon } from '@heroicons/react/24/solid'
import FeaturesCard from '../Components/Cards/FeaturesCard'
import VenueCard from '../Components/Cards/VenueCard'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Features } from '../Data/FeaturesData'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/userSlice'
import { motion, AnimatePresence } from 'framer-motion'
import sportsImage from '../Assets/lottie/sports.json'
import Lottie from 'react-lottie-player'
import Footer from '../Components/Footer/Footer'
import NewsLetterBox from '../Components/NewsLetterBox/NewsLetterBox'
import FAQ from '../Components/FAQ/FAQ'







function LandingPage() {

  const navigation = useNavigate()
  const { loading } = useSelector(state => state.alerts)
  const dispatch = useDispatch()
  const [allVenues, setAllVenues] = useState([])


  const getUserData = async () => {
    dispatch(showLoading())
    try {
      const response = await getUserInfoByIdToken({
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      dispatch(hideLoading())
      if (response.data.success) {
        dispatch(setUser(response.data.data.user))
        if (response.data.data.user.isAdmin) navigation('/admin')
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  // get featured venues
  const getAllVenues = async () => {
    dispatch(showLoading())
    try {
      const response = await getFeaturedVenuesAPI();
      if (response) {
        dispatch(hideLoading())
        setAllVenues(response.data)
      } else {
        dispatch(hideLoading())
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getUserData();
    getAllVenues();
  }, [])


  return (
    <>
      <AnimatePresence mode="popLayout">
        <Header pos={'fixed'} />

        {/* section1 */}
        <section className='w-full h-screen bg-slate-100 flex flex-col-reverse md:flex-row items-center'>

          <div className='w-full md:w-3/5 h-1/2 md:h-full px-5  md:px-20 flex flex-col justify-start md:justify-center '>
            <motion.h5
              key="pre-heading"
              initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: .1, duration: .6, type: 'tween' }} viewport={{ once: true }}
              className='text-sm md:text-md text-green-600' >Elite Courts & World Class Quality: Elevating Your Game Experience</motion.h5>
            <motion.h1
              key="main-heading"
              initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
              className='text-xl md:text-5xl font-bold' >Choose Your Court And Start Your Training</motion.h1>
            <motion.h5
              initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: .2, duration: .6, type: 'tween' }} viewport={{ once: true }}
              className='text-sm md:text-md' >
              Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art Facilities, and Personalized Training Programs.
            </motion.h5>

            <ButtonGroup
              isAttached variant='outline' mt={{ base: 6, md: 4 }} spacing={'6'}>
              <Button
                onClick={() => navigation('/venue-list')}
                leftIcon={<CalendarDaysIcon
                  className='w-5 h-5' />}
                colorScheme='green'>
                Book Your Slot
              </Button>
              <Button
                onClick={() => navigation('/organizer-register')}
                type="button"
                variant='solid'
                colorScheme='whatsapp'
                leftIcon={<CheckBadgeIcon className="h-6 w-6" />}
              >
                List Your Turf
              </Button>
            </ButtonGroup>

          </div>


          <motion.div
            initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className='md:w-2/5 w-5/6  h-1/3 md:h-full flex justify-center items-center'>
            <Lottie
              loop
              animationData={sportsImage}
              play
              speed={.2}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

        </section>

        {/* section 2 - features */}
        <section className='flex flex-col items-center py-10 md:py-20 h-auto md:h-screen md:bg-gray-50'>
          <motion.h2
            initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className="text-4xl text-center font-semibold">How It Works</motion.h2>
          <motion.h5
            initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className='w-3/4 md:w-full text-center'>Simplifying the booking process for coaches, venues, and athletes.</motion.h5>

          <motion.div
            initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className=' mt-10 md:mt-16  flex flex-col md:flex-row  gap-y-5 md:gap-y-0 md:justify-between w-5/6'>
            {
              Features.map((feature, index) => (
                <FeaturesCard key={index} feature={feature} />
              ))
            }
          </motion.div>

        </section>

        {/* section 3  - venues */}
        <section className='flex flex-col items-center py-10 md:py-20 bg-slate-100'>
          <motion.h2
            initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className="text-4xl text-center font-semibold">Featured Venues</motion.h2>
          <motion.h5
            initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className='text-center hidden md:block w-1/2'>Advanced sports venues offer the latest facilities, dynamic and unique environments for enhanced badminton performance.</motion.h5>

          <motion.div
            initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
            className='mt-10 md:mt-16 flex flex-col md:flex-row flex-wrap gap-y-5 md:gap-y-0 justify-between w-11/12 md:w-5/6'>
            {
              allVenues?.length > 0 && allVenues?.map((venue, index) => (
                <VenueCard key={"featuredVenue" + index} data={venue} />
              ))

            }
          </motion.div>

          <Button
            onClick={() => navigation('/venue-list')}
            mt={12}
            rightIcon={<ArrowForwardIcon />}
            // color='white'
            color='gray.800'
            _hover={{ border: '1px solid', borderColor: 'gray.800' }}
            variant='solid'
          >
            View More
          </Button>

        </section>

        {/* newsletter */}
        <motion.section
        initial={{scale:0.9,opacity:0}} whileInView={{scale:1,opacity:1}} transition={{duration:.5,type:'tween'}} viewport={{once:true}}
        className='bg-gradient-to-r from-green-500 to-green-900'>
          <NewsLetterBox isLight />
        </motion.section>

        {/* faq */}
        <section className='bg-slate-100'>
          <FAQ />
        </section>


        <Footer />
      </AnimatePresence>
    </>
  )
}

export default LandingPage