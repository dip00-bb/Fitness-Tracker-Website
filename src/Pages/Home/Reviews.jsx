import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';



const fetchLatestReviews = async () => {
  const { data } = await axiosPublic.get('/reviews/latest?limit=3');
  return data;
};

const TestimonialCarousel = () => {
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['latest-reviews'],
    queryFn: fetchLatestReviews,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red-500 text-center py-20">
        Couldn’t load reviews. Please try again later.
      </div>
    );

  return (
    <div className="bg-[#0f0f0f] py-20 text-white mx-w-auto px-4 ">
      <div className="px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left blurb */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
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

        {/* Right carousel */}
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop
            className="rounded-xl"
          >
            {testimonials.map((review) => (
              <SwiperSlide key={review._id}>
                {/* fixed‑height card */}
                <div className="bg-[#1f1f1f] h-80 p-8 rounded-xl shadow-xl flex flex-col overflow-hidden">
                  {/* review text shrinks / clips first */}
                  <p className="text-lg italic text-gray-200 mb-6 flex-1 overflow-hidden line-clamp-6">
                    {review.comment}
                  </p>

                  {/* footer sticks to bottom */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewer}
                      className="w-14 h-14 object-cover rounded-full border-2 border-lime-500"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">{review.reviewer}</h4>
                      <p className="text-sm text-gray-400">
                        {review.className} &nbsp;•&nbsp; ★{review.rating}
                      </p>
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
