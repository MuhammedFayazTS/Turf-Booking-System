import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


// import required modules
import {  Autoplay } from 'swiper/modules';
import { Divider } from '@chakra-ui/react';

function CourtPriceSlider({price,lightsOn}) {
    return (
        <div className='w-full h-44'>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                style={{
                    maxHeight:'180px'
                }}
                modules={[ Autoplay]}
            >
                <SwiperSlide style={{
                    height:'160px',
                    textAlign:'center',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <div className="w-full h-full rounded-lg bg-emerald-100 p-5 flex flex-col space-y-2 justify-center items-center">
                            <h5 className="text-md font-semibold text-slate-600">
                                Lights OFF
                            </h5>
                            <Divider w={'50%'} borderWidth={'1px'} borderColor={'gray.400'} />
                            <p>6:00 AM - 6:00 PM</p>
                            <p className='text-3xl font-semibold text-slate-600'>
                                ₹{price}/hr
                            </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{
                    height:'160px',
                    textAlign:'center',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <div className="w-full h-full rounded-lg bg-emerald-100 p-5 flex flex-col space-y-2 justify-center items-center">
                            <h5 className="text-md font-semibold text-slate-600">
                                Lights ON
                            </h5>
                            <Divider w={'50%'} borderWidth={'1px'} borderColor={'gray.400'} />
                            <p>6:00 PM - 6:00 AM</p>
                            <p className='text-3xl font-semibold text-slate-600'>
                                ₹{Number(price)+Number(lightsOn)}/hr
                            </p>
                    </div>
                </SwiperSlide>

                

            </Swiper>
        </div>
    )
}

export default CourtPriceSlider