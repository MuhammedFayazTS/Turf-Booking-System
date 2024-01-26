import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination,Autoplay } from 'swiper/modules';
function Carousel() {
  return (
    <>
      <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination,Autoplay]}
        className="w-full h-1/2"
      >
        <SwiperSlide>
            <img src="https://blog.playo.co/wp-content/uploads/2017/10/football-grounds-in-dubai.jpg" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vdGJhbGwlMjBncm91bmR8ZW58MHx8MHx8fDA%3D" alt="slide image" />
        </SwiperSlide>

      </Swiper>
    </>
  )
}

export default Carousel