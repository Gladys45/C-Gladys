// import { useEffect, useRef } from "react";
// import { SwiperContainer, register } from "swiper/element/bundle";
// import { SwiperOptions } from "swiper/types";
// import { SVGProps } from "react";

// export function ChevronLeft(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="1em"
//       height="1em"
//       viewBox="0 0 24 24"
//       {...props}
//     >
//       <path
//         fill="currentColor"
//         d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"
//       />
//     </svg>
//   );
// }
// register();

// const testimonials = [
//   {
//     content: `Buying an off plan property for the first time is no easy, but I got a Very good advice, service in this first venture into off plan property and has been a very positive experience and very profitable.`,
//     author: 'GRAHAM K.',
//   },
//   {
//     content: `Hi dear Friends, today I phoned up cupital group and answered all my questions kindly and professionally sent all the documents I needed (urgently). It was delightful and easy. Heartfelt thank you.`,
//     author: 'DANIELA (Landlord)',
//   },

//   {
//     content: `Thrilled with Cupital Group's years of support! They guided me from nervous first-time buyer to confident investor. Their friendly, passionate consultants are always available, even for late-night calls. They handle everything, making property buying stress-free. Highly recommend them!`,
//     author: 'SAMUEL (Landlord)',
//   },
// ]

// export default function Testimonials() {
//   const swiperRef = useRef<SwiperContainer>(null);

//   const handleSlideNext = () => {
//     swiperRef.current?.swiper.slideNext();
//   };

//   const handleSlidePrev = () => {
//     swiperRef.current?.swiper.slideNext();
//   };

//   useEffect(() => {
//     const swiperContainer = swiperRef.current;
//     const params: SwiperOptions = {
//       pagination: {
//         type: "fraction",
//       },
//       loop: true,
//       speed: 300,
//     };

//     if (swiperContainer) {
//       Object.assign(swiperContainer, params);
//       swiperContainer.initialize();
//     }
//   }, []);
//   return (
//     <div className="sm:h-[692px] py-20 flex justify-center bg-[#0C0203] text-white overflow-hidden px-6 sm:px-0 w-full">
//       <div className="flex flex-col sm:w-fit relative w-full">
//         <h4 className="text-4xl text-center text-primary">Testimonials</h4>
//         <swiper-container
//           ref={swiperRef}
//           class="flex justify-center mt-6 max-w-3xl w-full overflow-hidden"
//           init="false"
//         >
//           {testimonials.map((testimonial, index) => (
//             <swiper-slide
//               class="flex flex-col items-center gap-6 w-full"
//               key={index}
//             >
//               <div className="md:h-[400px] h-[350px] w-[10%]- overflow-hidden">
//                 <p className="w-fit md:max-w-4xl md:text-2xl !leading-10 font-extralight text-center">
//                   {testimonial.content}
//                 </p>
//                 <span className="block text-center mt-4">
//                   {testimonial.author}
//                 </span>
//               </div>
//             </swiper-slide>
//           ))}
//         </swiper-container>
//         <a
//           href="#listings"
//           className="mt-8 animate-bounce cursor-pointer mx-auto"
//         >
//           <svg
//             className="next-arrow text-primary"
//             width="40px"
//             height="68px"
//             viewBox="0 0 40 50"
//           >
//             <path
//               stroke="currentColor"
//               strokeWidth={2}
//               fill="none"
//               d="M20 0v51"
//             />
//             <path
//               stroke="currentColor"
//               strokeWidth={2}
//               fill="none"
//               d="M12 44L20 52 28 44"
//             />
//           </svg>
//         </a>
//         <button onClick={handleSlidePrev} className="flex items-center">
//           <ChevronLeft className="absolute w-6 h-6 top-1/2 -translate-y-1/2 -left-40" />
//         </button>
//         <button onClick={handleSlideNext}>
//           <ChevronLeft className="absolute w-6 h-6 top-1/2 -translate-y-1/2 -right-40 rotate-180" />
//         </button>
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useRef } from "react";
import { SwiperContainer, register } from "swiper/element/bundle";
import type { SwiperOptions } from "swiper/types";
import type { SVGProps } from "react";

import { TESTIMONIALS_SEED, getTestimonials } from "@/data"; // ✅ new data API

export function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"
      />
    </svg>
  );
}

// ✅ register web component once
register();

export default function Testimonials() {
  const swiperRef = useRef<SwiperContainer>(null);

  const testimonials = getTestimonials(TESTIMONIALS_SEED);

  const handleSlideNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const handleSlidePrev = () => {
    swiperRef.current?.swiper?.slidePrev(); // ✅ correct
  };

  useEffect(() => {
    const swiperContainer = swiperRef.current;

    const params: SwiperOptions = {
      pagination: { type: "fraction" },
      loop: true,
      speed: 300,
    };

    if (swiperContainer) {
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    }
  }, []);

  return (
    <div className="sm:h-[692px] py-20 flex justify-center bg-[#0C0203] text-white overflow-hidden px-6 sm:px-0 w-full">
      <div className="flex flex-col sm:w-fit relative w-full">
        <h4 className="text-4xl text-center text-primary">Testimonials</h4>

        <swiper-container
          ref={swiperRef}
          class="flex justify-center mt-6 max-w-3xl w-full overflow-hidden"
          init="false"
        >
          {testimonials.map((t) => (
            <swiper-slide class="flex flex-col items-center gap-6 w-full" key={t.id}>
              <div className="md:h-[400px] h-[350px] overflow-hidden">
                <p className="w-fit md:max-w-4xl md:text-2xl !leading-10 font-extralight text-center">
                  {t.content}
                </p>
                <span className="block text-center mt-4">
                  {t.author}
                  {t.role ? ` (${t.role})` : ""}
                </span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>

        <a href="#listings" className="mt-8 animate-bounce cursor-pointer mx-auto" aria-label="Scroll to listings">
          <svg className="next-arrow text-primary" width="40px" height="68px" viewBox="0 0 40 50">
            <path stroke="currentColor" strokeWidth={2} fill="none" d="M20 0v51" />
            <path stroke="currentColor" strokeWidth={2} fill="none" d="M12 44L20 52 28 44" />
          </svg>
        </a>

        <button onClick={handleSlidePrev} className="flex items-center" aria-label="Previous testimonial">
          <ChevronLeft className="absolute w-6 h-6 top-1/2 -translate-y-1/2 -left-40" />
        </button>

        <button onClick={handleSlideNext} aria-label="Next testimonial">
          <ChevronLeft className="absolute w-6 h-6 top-1/2 -translate-y-1/2 -right-40 rotate-180" />
        </button>
      </div>
    </div>
  );
}