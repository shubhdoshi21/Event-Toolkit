import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Directly import Autoplay and Navigation from 'swiper' package
import { Autoplay, Navigation } from "swiper/modules";

const GallerySlider = ({ images, slides, height }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={slides}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]} // Ensure modules are correctly imported
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      style={{ padding: "20px" }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-auto object-cover"
            style={{ height: `${height}px`, borderRadius: "8px" }}
          />
        </SwiperSlide>
      ))}
      {/* <div className="swiper-button-next text-grey"></div>
      <div className="swiper-button-prev text-grey"></div> */}
    </Swiper>
  );
};

export default GallerySlider;
