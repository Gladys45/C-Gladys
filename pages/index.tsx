// import {
//   FaFacebookF,
//   FaInstagram,



  
// } from 'react-icons/fa'
// import { FaXTwitter } from 'react-icons/fa6'
// import { FaArrowRightLong } from "react-icons/fa6";
// import { FiYoutube } from 'react-icons/fi'
// import { motion } from "framer-motion";
// import Testimonials from "../components/Testimonials";
// import Link from "next/link";

// const DATA = [
//   {
//     name: 'Hyacinth',
//     img: '/assets/images/img1.jpeg',
//     id: 1,
//   },
//   {
//    name: 'Heritage 100',
//     img: '/assets/images/img2.jpeg',
//     id: 2,
//   },
 
// ]
// export default function Home() {
//   return (
//     <main>
//       <section className="h-[1000px] bg-transpant p-0 m-0 relative z-[100] bg-black">
//         <video
//           src="/assets/BOSCO.webm"
//           loop
//           className="w-full h-full p-0 m-0 top-0 object-cover"
//           preload="auto"
//           autoPlay
//           muted
//         ></video>
//         <div className="absolute top-0 right-0 bg-black/40 w-full h-full" />
//         <motion.div
//           className="sm:w-[30px] h-[50px] z-[10000] absolute  bottom-1/2 left-10 sm:left-20 flex items-center gap-10 sm:gap-32"
//           initial={{ x: -200, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{
//             type: 'spring',
//             repeatType: 'mirror',
//             repeatDelay: 0.2,
//           }}
//         >
//           <div className="flex flex-col items-center gap-2">
//             <div className="h-[300px] bg-white w-[1px]" />
//             <div className="flex flex-col items-center gap-4">
//               <a
//                 href="https://x.com/cupitalgroup?s=11"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaXTwitter className="text-white" />
//               </a>
//               <a
//                 href="https://www.instagram.com/cupitalgroup?igsh=MThkOTk2enJ5OHdjbw%3D%3D"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaInstagram className="text-white" />
//               </a>
//               <a
//                 href="https://www.facebook.com/?_rdc=2&_rdr"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaFacebookF className="text-white" />
//               </a>
//               <a
//                 href="https://youtube.com/@cupitalgroup?si=YIam0uP25CYVhvtj"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FiYoutube className="text-white" />
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col gap-20 sm:gap-20 items-start ">
//             <h1 className="text-white text-2xl  sm:text-[40px] font-bold sm:w-[36rem] leading-tight">
//               Invest in New Build, Off Plan & High Income Property in The Latest
//               Regeneration Hotspots, Sustainability efficiency value for Money
//             </h1>
//             <Link
//               href="/categories"
//               className="py-5 rounded-sm text-white gap-5 text-xs px-10 flex items-center bg-primary hover:bg-opacity-90"
//             >
//               <span className="flex-1">VIEW PROJECT</span>
//               <FaArrowRightLong />
//             </Link>
//           </div>
//         </motion.div>
//       </section>
//       <section
//         id="our_story"
//         className="relative flex items-center justify-center z-50"
//       >
//         <picture className="absolute top-0 left-0 object-cover z-30 h-full w-full">
//           <img
//             src="/assets/frame1.jpg"
//             className="object-cover z-30 h-full w-full"
//           />
//         </picture>
//         <div className="flex flex-col items-center z-50 max-w-4xl pt-24 pb-24 sm:pb-30 sm:px-0 px-6">
//           <h1 className="text-primary text-4xl font-bold text-center">
//             The Cupital Group Story
//           </h1>
//           <p className="text-center text-white text-[18px] mt-6">
//             Cupital group ltd’s dedication to working with integrity and
//             providing his clients with an unparalleled level of service and
//             discretion has made him the uncontested choice for luxury real
//             estate representation. Serving a wide range of clients, from those
//             looking for retirement properties and vacation homes, to clients
//             seeking the very best in luxury houses, condos and townhomes,
//             Cupital group knows of all of the very best luxury properties in
//             Kigali, and the rest the country in Rwanda, and he knows how to sell
//             them.
//           </p>
//           <p className="text-center text-white text-[18px] mt-6">
//             Cupital group ltd can help his clients visualize and live their
//             dream of the ultimate lifestyle in one of Kigali’s most spectacular
//             luxury condominiums or estates. Property investment is the best
//             investment decision to make in RWANDA and my service as your real
//             estate agent will provide you with the information you need to make
//             informed decisions. Whether you are a Rwandan living in Rwanda, a
//             Rwandan in the diaspora or a foreigner looking to make a real estate
//             investment decision in RWANDA, the insights I have gained from my
//             experience, help me serve as your guide and to be your eyes and legs
//             on the ground in making ideal real estate purchase decisions. Having
//             years of experience in the industry, Cupital group knows how to
//             deliver the one-of-a-kind home that will fit into your life
//             perfectly.
//           </p>
//           <a
//             href="#our_story_two"
//             className="mt-8 animate-bounce cursor-pointer"
//           >
//             <svg
//               className="next-arrow text-primary"
//               width="40px"
//               height="68px"
//               viewBox="0 0 40 50"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 fill="none"
//                 d="M20 0v51"
//               />
//               <path
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 fill="none"
//                 d="M12 44L20 52 28 44"
//               />
//             </svg>
//           </a>
//         </div>
//       </section>
//       <section id="our_story_two">
//         <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-20 my-32 px-6">
//           <div className="m-auto">
//             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
//               <picture>
//                 <img
//                   src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt=""
//                   className="rounded-sm"
//                   width={450}
//                 />
//               </picture>
//             </motion.div>
//           </div>
//           <div className="flex flex-col gap-8">
//             <p className="text-xl">
//               Cupital group's team of talented professionals consists of office
//               admin staff, qualified buyers specialists and client service
//               assistants. This team of real estate professionals in Kigali area
//               will ensure that you're treated to the highest ethical and service
//               standards.
//             </p>
//             <p className="text-xl">
//               His continuous commitment to excellence in the marketing and
//               selling of luxury condominiums and homes in this new real estate
//               market, and his high-end negotiation expertise have helped him
//               establish himself as one of the nation’s leading experts.
//               Ultraluxury Condominium Division, Cupital group is often sought
//               out by national and international publications for his highly
//               specialized knowledge of this important new niche market of luxury
//               real estate.
//             </p>
//             <h5 className="text-center text-primary text-xl ">
//               Fill Form Below To Download My Real Estate Guide
//             </h5>
//             <div className="flex flex-col gap-2">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
//               />
//               <input
//                 type="text"
//                 placeholder="Email"
//                 className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
//               />
//               <div className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none">
//                 <select className="w-full outline-none">
//                   <option selected disabled value="">
//                     Reason for download
//                   </option>
//                   <option>I want to invest in Rwanda</option>
//                   <option>I need long term rentals in Rwanda</option>
//                 </select>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
//               />
//               <button className="w-fit bg-primary py-3 text-lg rounded-sm px-6 text-white mt-5">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <search id="testimonials">
//         <Testimonials />
//       </search>
//       <section id="listings" className="bg-[#EAEFF3]">
//         <div className="max-w-7xl px-10 sm:px-6 mx-auto flex flex-col gap-10 items-center py-20">
//           <h1 className="text-4xl sm:text-5xl font-semibold">
//             Featured Listings
//           </h1>
//           <div className="grid sm:grid-cols-2  min-h-[60vh] items-center gap-6 w-full">
//             {DATA.map((val, indx) => {
//               return (
//                 <Link
//                   href={`/categories/${val.name}`}
//                   key={val.id}
//                   className="relative h-[40vh] sm:hover:h-[50vh] sm:h-[45vh] hover:h-[45vh] hover:shadow-2xl rounded-sm overflow-hidden flex items-end justify-start cursor-pointer group transition-all duration-300"
//                 >
//                   <picture>
//                     <img
//                       src={val.img}
//                       className="absolute w-full h-full top-0 left-0 object-cover transition-all duration-300 group-hover:scale-100"
//                     />
//                   </picture>
//                   <div className="absolute w-full h-full top-0 left-0 bg-black/40 group-hover:bg-black/20" />
//                   <div className="z-50 text-white px-6 pb-10">
//                     <h1 className="text-xl font-semibold mb-4">{val.name}</h1>
//                     <button className="px-10 text-sm py-4 rounded-md w-full bg-black">
//                       View listing
//                     </button>
//                   </div>
//                 </Link>
//               )
//             })}
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }



// import FeaturedListingsSection, { ListingItem } from "@/components/home/FeaturedListingsSection";
// import GuideDownloadSection from "@/components/home/GuideDownloadSection";
// import HeroSection from "@/components/home/HeroSection";
// import StorySection from "@/components/home/StorySection";
// import TestimonialsSection from "@/components/home/TestimonialsSection";
// import ListingsExplorer from "@/components/listings/ListingsExplorer";
// import ServicesSection from "@/components/services/ServicesSection";

// const LISTINGS: ListingItem[] = [
//   { name: "Hyacinth", img: "/assets/images/img1.jpeg", id: 1 },
//   { name: "Heritage 100", img: "/assets/images/img2.jpeg", id: 2 },
// ];

// export default function Home() {
//   return (
//     <main>
//       <HeroSection
//         videoSrc="/assets/BOSCO.webm"
//         headline="Invest in New Build, Off Plan & High Income Property in The Latest Regeneration Hotspots, Sustainability efficiency value for Money"
//         ctaHref="/categories"
//         ctaText="VIEW PROJECT"
//       />

//       <StorySection
//         id="our_story"
//         title="The Cupital Group Story"
//         backgroundImageSrc="/assets/frame1.jpg"
//         paragraphs={[
//           "Cupital group ltd’s dedication to working with integrity and providing his clients with an unparalleled level of service and discretion has made him the uncontested choice for luxury real estate representation. Serving a wide range of clients, from those looking for retirement properties and vacation homes, to clients seeking the very best in luxury houses, condos and townhomes, Cupital group knows of all of the very best luxury properties in Kigali, and the rest the country in Rwanda, and he knows how to sell them.",
//           "Cupital group ltd can help his clients visualize and live their dream of the ultimate lifestyle in one of Kigali’s most spectacular luxury condominiums or estates. Property investment is the best investment decision to make in RWANDA and my service as your real estate agent will provide you with the information you need to make informed decisions. Whether you are a Rwandan living in Rwanda, a Rwandan in the diaspora or a foreigner looking to make a real estate investment decision in RWANDA, the insights I have gained from my experience, help me serve as your guide and to be your eyes and legs on the ground in making ideal real estate purchase decisions. Having years of experience in the industry, Cupital group knows how to deliver the one-of-a-kind home that will fit into your life perfectly.",
//         ]}
//         nextAnchorHref="#our_story_two"
//       />

//       <GuideDownloadSection
//         id="our_story_two"
//         imageSrc="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         leftText={[
//           "Cupital group's team of talented professionals consists of office admin staff, qualified buyers specialists and client service assistants. This team of real estate professionals in Kigali area will ensure that you're treated to the highest ethical and service standards.",
//           "His continuous commitment to excellence in the marketing and selling of luxury condominiums and homes in this new real estate market, and his high-end negotiation expertise have helped him establish himself as one of the nation’s leading experts. Ultraluxury Condominium Division, Cupital group is often sought out by national and international publications for his highly specialized knowledge of this important new niche market of luxury real estate.",
//         ]}
//         title="Fill Form Below To Download My Real Estate Guide"
//         options={[
//           { value: "invest", label: "I want to invest in Rwanda" },
//           { value: "rentals", label: "I need long term rentals in Rwanda" },
//         ]}
//         onSubmit={async (data) => {
//           // plug your API here later
//           console.log("Guide form submit:", data);
//         }}
//       />

//       <TestimonialsSection id="testimonials" />


//       <ServicesSection
//     id="services"
//     title="Property Services"
//     subtitle="From selling and buying to renting, letting, international property, and negotiation, we support clients through every stage of the property journey."
//   />
      
//        <ListingsExplorer />
       

//       <FeaturedListingsSection id="listings" title="Featured Listings" items={LISTINGS} />
//     </main>
//   );
// }


// import type { GetServerSideProps, NextPage } from "next";
// import HeroSection from "@/components/home/HeroSection";
// import StorySection from "@/components/home/StorySection";
// import GuideDownloadSection from "@/components/home/GuideDownloadSection";
// import TestimonialsSection from "@/components/home/TestimonialsSection";
// import ServicesSection from "@/components/services/ServicesSection";
// import PublicFeaturedListings from "@/components/listings/FeaturedListings";
// import PublicListingsExplorer from "@/components/listings/ListingsExplorer";
// import type {
//   PublicListingCard,
//   PublicListingRecord,
// } from "@/lib/listings/types";
// import { getLandingPageListings } from "@/lib/listings/service";

// type Props = {
//   cards: PublicListingCard[];
//   records: PublicListingRecord[];
//   featuredCards: PublicListingCard[];
// };

// type GuideFormSubmission = {
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   option: string;
//   message?: string;
// };

// type SendFormEmailResponse = {
//   success: boolean;
//   message: string;
// };

// const HomePage: NextPage<Props> = ({ cards, records, featuredCards }) => {
//   const handleGuideFormSubmit = async (
//     data: GuideFormSubmission
//   ): Promise<void> => {
//     try {
//       const response = await fetch("/api/send-form-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName: data.fullName,
//           email: data.email,
//           phoneNumber: data.phoneNumber ?? "",
//           interest: data.option,
//           message: data.message ?? "",
//         }),
//       });

//       const result = (await response.json()) as SendFormEmailResponse;

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to submit form.");
//       }

//       alert("Your request has been submitted successfully.");
//     } catch (error) {
//       const message =
//         error instanceof Error
//           ? error.message
//           : "Something went wrong while submitting the form.";

//       console.error("Guide form submission failed:", error);
//       alert(message);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-white">
//       <HeroSection
//         headline="Creativity. Intelligent. Technology."
//         subheadline="Setting the New Standard"
//       />

//       <StorySection
//         id="our_story"
//         title="The Cupital Group Story"
//         backgroundImageSrc="/assets/frame1.jpg"
//         paragraphs={[
//           "Cupital Group Ltd’s dedication to working with integrity and providing clients with an unparalleled level of service and discretion has made the company a trusted choice for luxury real estate representation. Serving a wide range of clients, from those looking for retirement properties and vacation homes to clients seeking the very best in luxury houses, condominiums, and townhomes, Cupital Group understands the premium property market in Kigali and across Rwanda and knows how to position exceptional properties successfully.",
//           "Cupital Group Ltd helps clients visualize and achieve their ideal lifestyle through access to some of Kigali’s most spectacular luxury condominiums and estates. Property investment remains one of the strongest investment decisions in Rwanda, and our service as a real estate partner provides the guidance and market insight needed to make informed decisions. Whether you are a Rwandan living locally, a member of the diaspora, or an international investor exploring real estate opportunities in Rwanda, the experience and market knowledge behind Cupital Group ensure dependable support throughout the purchasing journey.",
//         ]}
//         nextAnchorHref="#our_story_two"
//       />

//       <GuideDownloadSection
//         id="our_story_two"
//         imageSrc="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         leftText={[
//           "Cupital Group's team of talented professionals includes administrative staff, qualified buyer specialists, and client service assistants. This team ensures that every client receives service delivered with professionalism, integrity, and a high ethical standard throughout the property journey.",
//           "Our continued commitment to excellence in marketing and selling luxury condominiums and homes, combined with strong negotiation expertise, has helped establish Cupital Group as a respected name in premium real estate. The business is frequently valued for its deep market knowledge and its ability to guide clients confidently through high-value real estate decisions.",
//         ]}
//         title="Fill the Form Below to Download My Real Estate Guide"
//         options={[
//           { value: "invest", label: "I want to invest in Rwanda" },
//           { value: "rentals", label: "I need long term rentals in Rwanda" },
//         ]}
//         onSubmit={handleGuideFormSubmit}
//       />

//       <TestimonialsSection id="testimonials" />

//       <ServicesSection
//         id="services"
//         title="Property Services"
//         subtitle="From selling and buying to renting, letting, international property, and negotiation, we support clients through every stage of the property journey."
//       />

//       <section className="bg-black text-white">
//         <div className="mx-auto max-w-7xl px-6 py-20">
//           <div className="max-w-3xl space-y-4">
//             <h2 className="text-4xl font-bold sm:text-5xl">
//               Find verified property opportunities with live database listings
//             </h2>
//             <p className="text-lg text-neutral-300">
//               Browse houses and land directly from our published property database.
//             </p>
//           </div>
//         </div>
//       </section>

//       <PublicFeaturedListings listings={featuredCards} />
//       <PublicListingsExplorer cards={cards} records={records} />
//     </main>
//   );
// };

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   try {
//     const { cards, records, featuredCards } = await getLandingPageListings();

//     return {
//       props: {
//         cards,
//         records,
//         featuredCards,
//       },
//     };
//   } catch (error) {
//     console.error("Failed to load landing page listings:", error);

//     return {
//       props: {
//         cards: [],
//         records: [],
//         featuredCards: [],
//       },
//     };
//   }
// };

// export default HomePage;



import type { GetServerSideProps, NextPage } from "next";
import HeroSection from "@/components/home/HeroSection";
import StorySection from "@/components/home/StorySection";
import GuideDownloadSection from "@/components/home/GuideDownloadSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSection from "@/components/services/ServicesSection";
import PublicFeaturedListings from "@/components/listings/FeaturedListings";
import PublicListingsExplorer from "@/components/listings/ListingsExplorer";
import type {
  PublicListingCard,
  PublicListingRecord,
} from "@/lib/listings/types";
import { getLandingPageListings } from "@/lib/listings/service";

type Props = {
  cards: PublicListingCard[];
  records: PublicListingRecord[];
  featuredCards: PublicListingCard[];
};

type GuideFormSubmission = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  option: string;
  message?: string;
};

type SendFormEmailResponse = {
  success: boolean;
  message: string;
};

const HomePage: NextPage<Props> = ({ cards, records, featuredCards }) => {
  const safeCards = Array.isArray(cards) ? cards : [];
  const safeRecords = Array.isArray(records) ? records : [];
  const safeFeaturedCards = Array.isArray(featuredCards) ? featuredCards : [];

  const handleGuideFormSubmit = async (
    data: GuideFormSubmission,
  ): Promise<void> => {
    try {
      const response = await fetch("/api/send-form-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber ?? "",
          interest: data.option,
          message: data.message ?? "",
        }),
      });

      const result = (await response.json()) as SendFormEmailResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form.");
      }

      alert("Your request has been submitted successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the form.";

      console.error("Guide form submission failed:", error);
      alert(message);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        headline="Creativity. Intelligent. Technology."
        subheadline="Setting the New Standard"
      />

      <StorySection
        id="our_story"
        title="The Cupital Group Story"
        backgroundImageSrc="/assets/frame1.jpg"
        paragraphs={[
          "Cupital Group Ltd’s dedication to working with integrity and providing clients with an unparalleled level of service and discretion has made the company a trusted choice for luxury real estate representation. Serving a wide range of clients, from those looking for retirement properties and vacation homes to clients seeking the very best in luxury houses, condominiums, and townhomes, Cupital Group understands the premium property market in Kigali and across Rwanda and knows how to position exceptional properties successfully.",
          "Cupital Group Ltd helps clients visualize and achieve their ideal lifestyle through access to some of Kigali’s most spectacular luxury condominiums and estates. Property investment remains one of the strongest investment decisions in Rwanda, and our service as a real estate partner provides the guidance and market insight needed to make informed decisions. Whether you are a Rwandan living locally, a member of the diaspora, or an international investor exploring real estate opportunities in Rwanda, the experience and market knowledge behind Cupital Group ensure dependable support throughout the purchasing journey.",
        ]}
        nextAnchorHref="#our_story_two"
      />

      <GuideDownloadSection
        id="our_story_two"
        imageSrc="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        leftText={[
          "Cupital Group's team of talented professionals includes administrative staff, qualified buyer specialists, and client service assistants. This team ensures that every client receives service delivered with professionalism, integrity, and a high ethical standard throughout the property journey.",
          "Our continued commitment to excellence in marketing and selling luxury condominiums and homes, combined with strong negotiation expertise, has helped establish Cupital Group as a respected name in premium real estate. The business is frequently valued for its deep market knowledge and its ability to guide clients confidently through high-value real estate decisions.",
        ]}
        title="Fill the Form Below to Download My Real Estate Guide"
        options={[
          { value: "invest", label: "I want to invest in Rwanda" },
          { value: "rentals", label: "I need long term rentals in Rwanda" },
        ]}
        onSubmit={handleGuideFormSubmit}
      />

      <TestimonialsSection id="testimonials" />

      <ServicesSection
        id="services"
        title="Property Services"
        subtitle="From selling and buying to renting, letting, international property, and negotiation, we support clients through every stage of the property journey."
      />

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Find verified property opportunities with live database listings
            </h2>
            <p className="text-lg text-neutral-300">
              Browse houses and land directly from our published property database.
            </p>
          </div>
        </div>
      </section>

      <PublicFeaturedListings listings={safeFeaturedCards} />
      <PublicListingsExplorer cards={safeCards} records={safeRecords} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const result = await getLandingPageListings();

    return {
      props: {
        cards: Array.isArray(result?.cards) ? result.cards : [],
        records: Array.isArray(result?.records) ? result.records : [],
        featuredCards: Array.isArray(result?.featuredCards)
          ? result.featuredCards
          : [],
      },
    };
  } catch (error) {
    console.error("Failed to load landing page listings:", error);

    return {
      props: {
        cards: [],
        records: [],
        featuredCards: [],
      },
    };
  }
};

export default HomePage;