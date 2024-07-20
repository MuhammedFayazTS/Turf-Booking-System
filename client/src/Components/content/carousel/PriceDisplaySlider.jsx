import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Divider } from '@chakra-ui/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const PriceDisplaySlider = ({ price, additionalCharge }) => {
  const slides = [
    {
      title: 'Standard Price',
      time: '6:00 AM - 6:00 PM', //TODO: update from api
      price: price,
    },
    {
      title: 'Added Price',
      time: '6:00 PM - 6:00 AM', //TODO: update from api
      price: parseInt(price) + parseInt(additionalCharge),
    },
  ];

  return (
    <div className="w-full h-44">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{ maxHeight: '180px' }}
        modules={[Autoplay]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: '160px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="w-full h-full rounded-lg bg-emerald-100 p-5 flex flex-col space-y-2 justify-center items-center">
              <h5 className="text-md font-semibold text-slate-600">{slide.title}</h5>
              <Divider w={'50%'} borderWidth={'1px'} borderColor={'gray.400'} />
              <p>{slide.time}</p>
              <p className="text-3xl font-semibold text-slate-600">₹{slide.price}/hr</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PriceDisplaySlider;
