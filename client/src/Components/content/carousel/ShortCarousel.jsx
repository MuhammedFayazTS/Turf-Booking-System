import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import './shortCarouselStyle.css';
import { FreeMode, Navigation } from 'swiper/modules';

const defaultImg =
  'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vdGJhbGwlMjBncm91bmR8ZW58MHx8MHx8fDA%3D';

function ShortCarousel({ images }) {
  const slideImages = images?.length > 0 ? images : [defaultImg];

  const getSlidesPerView = (length, breakpoint) => {
    let slidesPerView;
    if (breakpoint <= 340) {
      slidesPerView = 1;
    } else {
      switch (length) {
        case 1:
          slidesPerView = length;
          break;
        case 2:
          slidesPerView = length;
          break;
        default:
          slidesPerView = 3;
          break;
      }
    }
    return slidesPerView;
  };

  return (
    <div className="carousel-container">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: getSlidesPerView(slideImages.length, 340),
            spaceBetween: 5,
          },
          700: {
            slidesPerView: getSlidesPerView(slideImages.length, 700),
            spaceBetween: 5,
          },
        }}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={slideImages.length > 1}
        modules={[FreeMode, Navigation]}
        className="w-full"
      >
        {slideImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-6 relative shadow-lg">
              <img className="w-full h-full block aspect-square object-cover" src={slide} alt={`Slide ${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ShortCarousel;