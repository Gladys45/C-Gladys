// "use client";
// import ArticleCard from "@/components/cards/ArticleCard";
// import classNames from "classnames";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { useClickAway } from "react-use";

// const IMAGESRCS = [
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },

//   {
//     imageSrc:
//       "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600",
//   },
// ];
// export default function InvestRwanda() {
//   const [modalOpenone, setModalOpenone] = useState(false);

//   const closeone = () => setModalOpenone(false);
//   const openone = () => setModalOpenone(true);
//   const ref = useRef(null);
//   useClickAway(ref, () => {
//     closeone();
//   });
//   return (
//     <>
//       <div>
//         <section className="h-[900px] bg-transpant p-0 m-0 relative z-[100] bg-black">
//           <img
//             src="/assets/images/home.jpg"
//             className="w-full h-full p-0 m-0 top-0 object-cover"
//           />
//           <div className="absolute top-0 right-0 bg-black/20 w-full h-full" />
//           <motion.div
//             className="sm:w-[40%] h-[50px] z-[10000] absolute  bottom-1/2 left-10 sm:left-20 flex items-center gap-10 sm:gap-32"
//             initial={{ x: -200, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{
//               type: "spring",
//               repeatType: "mirror",
//               repeatDelay: 0.2,
//             }}
//           >
//             <div className="flex flex-col items-center gap-2">
//               <div className="h-[300px] bg-transparent w-[1px]" />
//               <div className="flex flex-col items-center gap-4"></div>
//             </div>
//             <div className="flex flex-col gap-10 sm:gap-10 items-start">
//               <h1 className="text-white text-2xl  sm:text-6xl font-semibold">
//                 Rwanda A Real Estate Investment Hotspot
//               </h1>
//               <div className="flex flex-col gap-4">
//               {/* <a href="/real-estate-guide.pdf" download> */}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="flex gap-6 items-center duration-300 transition-all hover:bg-primary/90 hover:-top-2 top-0 relative bg-primary px-6 py-[10px] rounded-sm text-white text-[13px] shadow-md"
//                   onClick={() => (modalOpenone ? closeone() : openone())}
//                 >
//                   <span>Download Your Real Estate Guide</span>
//                   <FaArrowRight />
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </section>
//         <div className="bg-black py-32">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="grid sm:grid-cols-3 gap-10">
//               {IMAGESRCS.map((v, i) => {
//                 const addone = i.toString().slice(-1);
//                 return (
//                   <div
//                     className={classNames({
//                       "relative col-span-1": true,
//                       "sm:col-span-2 ": addone === "0" || addone === "6",
//                     })}
//                     key={i}
//                   >
//                     <Link
//                       href={`/categories/house/Prime Apartments in Accra: Where Luxury Meets Convenience`}
//                     >
//                       <ArticleCard imageSrc={v.imageSrc} key={1} />
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {modalOpenone && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md z-[30000] flex items-center justify-center"
//         >
//           <div
//             ref={ref}
//             className="max-w-md bg-white w-full p-8 rounded-md flex items-center flex-col gap-4"
//           >
//             <h1 className="sm:text-xl font-semibold">
//               Download Your Real Estate Guide
//             </h1>
//             <div className="flex flex-col gap-2 w-full items-center">
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
//               <input
//                 type="text"
//                 placeholder="Phone Number"
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

//               <button
//                 onClick={() => closeone()}
//                 className="w-fit bg-primary py-3 text-lg rounded-sm px-6 text-white mt-5"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </>
//   );
// }

// pages/invest-rwanda.tsx

"use client";
import { useState } from "react";
import InvestHero from "@/components/invest/InvestHero";
import PropertyGrid from "@/components/invest/PropertyGrid";
import DownloadModal from "@/components/invest/DownloadModal";
import { getRecentProperties } from "@/services/investRwandaData";
import { DownloadFormData } from "@/types/invest-rwanda";

export default function InvestRwanda() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recentProperties = getRecentProperties(9);

  const handleDownload = async (data: DownloadFormData) => {
    try {
      // Send email via API - FIXED URL for Pages Router
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Open PDF after successful email
        window.open("/assets/guides/real-estate-guide.pdf", "_blank");
        
        // Show success message
        alert("Thank you! Your guide is downloading...");
        setIsModalOpen(false); // Close modal on success
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("There was an error. Please try again or contact us directly.");
      throw error;
    }
  };

  return (
    <>
      <InvestHero
        title="Rwanda: A Real Estate Investment Hotspot"
        backgroundImage="/assets/images/home.jpg"
        onButtonClick={() => setIsModalOpen(true)}
      />
      
      <PropertyGrid
        properties={recentProperties}
        title="Featured Investment Opportunities"
        columns={3}
      />
      
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideTitle="Real Estate Investment Guide"
        onSubmit={handleDownload}
      />
    </>
  );
}