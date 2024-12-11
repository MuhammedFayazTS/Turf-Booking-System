import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Features } from '../../Data/FeaturesData';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../core/Header/Header';
import Lottie from 'react-lottie-player';
import Footer from '../core/Footer/Footer';
import NewsLetterBox from '../NewsLetterBox/NewsLetterBox';
import FAQ from '../content/faq/FAQ';
import sportAnimation from '../lottie/sports.json';
import { listTurfsForHome } from '../../redux/slices/turf.slice';
import TurfCard from '../content/card/TurfCard';
import FeatureCard from '../content/card/FeatureCard';
import { getUserLocation } from '../../Utils/location.helper';
import { setLocation } from '../../redux/slices/location.slice';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { turfsForHome, loading } = useSelector((state) => state.turf);
  const { location } = useSelector((state) => state.location);

  const renderFeatureCards = () => {
    return Features.map((feature) => <FeatureCard key={feature.title} feature={feature} />);
  };

  const renderTurfCards = () => {
    return loading === false && turfsForHome?.map((turf) => <TurfCard key={turf._id} data={turf} />);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!location?.name) {
        await getUserLocation(dispatch, setLocation);
      }
      dispatch(listTurfsForHome());
    };

    fetchData();
  }, [dispatch, location?.name]);

  return (
    <AnimatePresence mode="popLayout">
      <Header pos="fixed" />

      {/* Section 1 */}
      <section className="w-full h-screen bg-slate-100 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-3/5 h-1/2 md:h-full px-5 md:px-20 flex flex-col justify-start md:justify-center">
          <motion.h5
            key="pre-heading"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, type: 'tween' }}
            viewport={{ once: true }}
            className="text-sm md:text-md text-green-600"
          >
            Elite Courts & World Class Quality: Elevating Your Game Experience
          </motion.h5>
          <motion.h2
            key="main-heading"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'tween' }}
            viewport={{ once: true }}
            className="text-xl md:text-5xl font-bold"
          >
            Choose Your Court And Start Your Training
          </motion.h2>
          <motion.h5
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'tween' }}
            viewport={{ once: true }}
            className="text-sm md:text-md"
          >
            Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art Facilities, and Personalized Training
            Programs.
          </motion.h5>

          <ButtonGroup isAttached variant="outline" mt={{ base: 6, md: 4 }} spacing="6">
            <Button
              onClick={() => navigate('/turf-list')}
              leftIcon={<CalendarDaysIcon className="w-5 h-5" />}
              colorScheme="green"
            >
              Book Your Slot
            </Button>
            <Button
              onClick={() => navigate('/organizer-register')}
              variant="solid"
              colorScheme="whatsapp"
              leftIcon={<CheckBadgeIcon className="h-6 w-6" />}
            >
              List Your Turf
            </Button>
          </ButtonGroup>
        </div>

        <motion.div
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="md:w-2/5 w-5/6 h-1/3 md:h-full flex justify-center items-center"
        >
          <Lottie loop animationData={sportAnimation} play speed={0.2} style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </section>

      {/* Section 2 - Features */}
      <section className="flex flex-col items-center py-10 md:py-20 h-auto md:h-screen md:bg-gray-50">
        <motion.h2
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="text-4xl text-center font-semibold"
        >
          How It Works
        </motion.h2>
        <motion.h5
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="w-3/4 md:w-full text-center"
        >
          Simplifying the booking process for coaches, venues, and athletes.
        </motion.h5>

        <motion.div
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 flex flex-col md:flex-row gap-y-5 md:gap-y-0 md:justify-between w-5/6"
        >
          {renderFeatureCards()}
        </motion.div>
      </section>

      {/* Section 3 - Turfs */}
      <section className="flex flex-col items-center py-10 md:py-20 bg-slate-100">
        <motion.h2
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="text-4xl text-center font-semibold"
        >
          Featured Turfs
        </motion.h2>
        <motion.h5
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="text-center hidden md:block w-1/2"
        >
          Advanced sports turfs offer the latest facilities, dynamic and unique environments for enhanced badminton
          performance.
        </motion.h5>

        <motion.div
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: 'tween' }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 flex flex-col md:flex-row flex-wrap gap-y-5 md:gap-y-0 justify-between w-11/12 md:w-5/6"
        >
          {renderTurfCards()}
        </motion.div>

        <Button
          onClick={() => navigate('/turf-list')}
          mt={12}
          rightIcon={<ArrowForwardIcon />}
          color="gray.800"
          _hover={{ border: '1px solid', borderColor: 'gray.800' }}
          variant="solid"
        >
          View More
        </Button>
      </section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, type: 'tween' }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-500 to-green-900"
      >
        <NewsLetterBox isLight />
      </motion.section>

      {/* FAQ */}
      <section className="bg-slate-100">
        <FAQ />
      </section>

      <Footer />
    </AnimatePresence>
  );
}

export default LandingPage;
