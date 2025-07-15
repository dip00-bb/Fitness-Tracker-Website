import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



const TestimonialCarousel = () => {
  return (
    <div className="bg-[#0f0f0f] py-20 text-white">
      <div className="px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left Section */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6">
            Don’t just take our <span className="text-lime-500">word</span> for it
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Witness it firsthand, directly from our lovely members.
          </p>
          <a
            href="/all-reviews"
            className="uppercase tracking-wide text-lime-500 hover:underline font-semibold"
          >
            See all reviews
          </a>
        </div>

        {/* Right Carousel */}
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className="rounded-xl"
          >
            {testimonials.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-xl">
                  <p className="text-lg italic text-gray-200 mb-6">{review.quote}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 object-cover rounded-full border-2 border-lime-500"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">{review.name}</h4>
                      <p className="text-sm text-gray-400">{review.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;

