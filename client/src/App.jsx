import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import loader from './Assets/lottie/loader.json'
import Lottie from 'react-lottie-player'
import AllRoutes from './Routes/AllRoutes';
import { ScrollToTop } from 'react-simple-scroll-up';
import { ArrowUpIcon } from '@heroicons/react/24/solid';



function App() {
  const { loading } = useSelector(state => state.alerts)

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      {loading && <div className="w-full h-screen flex justify-center items-center fixed top-0 backdrop-blur-[2px] left-0 z-50"
        style={{ background: 'rgba(0,0,0,0.7)' }}>
        <Lottie
          loop
          animationData={loader}
          play
          style={{ width: 150, height: 150 }}
        />
      </div>}

      <ScrollToTop className='z-20' strokeWidth={3} strokeFillColor={'#059669'} bgColor='#E2E8F0' symbol={<ArrowUpIcon className='w-6 h-6' />} />


      {/* routes */}
      <AllRoutes />

    </>
  );
}

export default App;
