import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import './shortCarouselStyle.css'

import {  FreeMode, Navigation } from 'swiper/modules';



const defaultImg = "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vdGJhbGwlMjBncm91bmR8ZW58MHx8MHx8fDA%3D"
function ShortCarousel({images}) {
    const slideImages = images?.length>0?images:[1,2,3]
    return (
        <div>
            <Swiper
                breakpoints={{
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 5
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 5
                    },
                }}
                freeMode={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                loop={true}
                modules={[ FreeMode,Navigation]}
                className="w-full"
            >
                {slideImages?.map((slideIndex) => (
                    <SwiperSlide key={slideIndex}
                    >
                        <div className='flex flex-col gap-6 relative shadow-lg '>
                            <img
                                className='w-full h-full block aspect-square object-cover' // Adjusted class to remove white space
                                src={images?.length?slideIndex:defaultImg}
                                alt={`Slide ${slideIndex}`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ShortCarousel