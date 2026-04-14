// import React from "react";
// import { ImFacebook2 } from "react-icons/im";
// import { Icon } from "@iconify-icon/react";
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <>
//       <div className="hero-image grid px-4">
//         <div className="relative  max-w-7xl mx-auto my-10">
//           <div className="bg-black/50 absolute top-0 left-0 w-full h-full z-50"></div>
//           <img
//             className="w-full h-full"
//             src={'/assets/images/img10.jpeg'}
//             alt="image"
//           />
//         </div>
//       </div>
//       <div className="bg-black text-white py-14 ">
//         <div className="grid sm:grid-cols-4 px-6 max-w-7xl mx-auto text-center">
//           <div className="">
//             <div>
//               <h1 className="text-base text-start uppercase">
//                 Featured Articles/Blogs
//               </h1>
//             </div>
//             <div className="space-y-2 text-sm mt-4">
//               {["How to invest in Rwanda's vibrant real estate space"].map(
//                 (value, index) => {
//                   return (
//                     <Link href={`/categories/${value}`} className="px-4 flex">
//                       <p className="list-item"></p>
//                       <p className="text-start   capitalize cursor-pointer text-primary hover:text-white duration-500">
//                         {value}
//                       </p>
//                     </Link>
//                   )
//                 }
//               )}
//             </div>
//             {/* <div className="space-y-2 text-sm mt-4">
//               <h1 className="text-base text-start uppercase">
//                 FEATURED ARTICLES/BLOGS
//               </h1>
//               {[
//                 "How to invest in Rwanda's vibrant real estate space",
//                 'kass towers',
//                 'outskirts resort rwanda',
//               ].map((value, index) => {
//                 return (
//                   <Link
//                     className="px-4 flex"
//                     href={`/categories/belmonte/${value}`}
//                   >
//                     <p className="list-item"></p>
//                     <p className="text-start   capitalize cursor-pointer text-primary hover:text-white duration-500">
//                       {value}
//                     </p>
//                   </Link>
//                 )
//               })}
//             </div> */}
//           </div>
//           <div className="grid grid-cols-2 col-span-2 sm:mt-0 mt-4">
//             {footerData.map((value, index) => {
//               return (
//                 <div>
//                   <h1 className="text-base uppercase mb-2">{value.title}</h1>
//                   <div className="space-y-2 text-sm flex flex-col">
//                     {value.arr.map((value, index) => {
//                       return (
//                         <Link
//                           className="capitalize text-primary hover:text-white duration-500 cursor-pointer"
//                           key={index}
//                           href={`/categories/${value}`}
//                         >
//                           {value}
//                         </Link>
//                       )
//                     })}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//           <div className="sm:mt-0 mt-4">
//             <div>
//               <h1 className="text-base uppercase ">Join our mailing list</h1>
//             </div>
//             <div className="mt-6">
//               <button className="py-4 hover:-translate-y-1 duration-500 uppercase bg-primary text-white text-lg rounded-sm font-medium px-10 ">
//                 Suscribe
//               </button>
//             </div>
//             <div className="space-y-2 text-xl mt-4">
//               {['sitemap', 'aboutus', 'termsofservices', 'privacypolicy'].map(
//                 (value, index) => {
//                   return (
//                     <div>
//                       <p className="capitalize cursor-pointer text-primary hover:text-white duration-500">
//                         {value}
//                       </p>
//                     </div>
//                   )
//                 }
//               )}
//             </div>
//             <div className="space-y-1 text-xl mt-8">
//               <h1 className="text-xl uppercase mb-2">Contact</h1>
//               {['+250-078-457-8531', '+250-078-381-2110'].map(
//                 (value, index) => {
//                   return (
//                     <div>
//                       <p className="capitalize font-medium cursor-pointer text-primary hover:text-white duration-500">
//                         {value}
//                       </p>
//                     </div>
//                   )
//                 }
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="grid pt-14">
//           {/* <div className="mx-auto">
//             <img
//               className="object-cover object-center h-10 sm:h-24"
//               src="https://anaarkutu.com/wp-content/uploads/2022/10/Ana-Arkutu-600x170.png"
//               alt="image"
//             />
//           </div> */}
//           <div className="mx-auto flex py-8 gap-5 sm:gap-10 flex-wrap">
//             {[
//               'entypo-social:facebook',
//               'ri:instagram-line',
//               'icomoon-free:whatsapp',
//               'cib:linkedin',
//               'simple-icons:youtube',
//               'octicon:mail-16',
//               // 'healthicons:phone-negative',
//             ].map((value, index) => {
//               return (
//                 <Icon
//                   icon={`${value}`}
//                   className="text-lg sm:text-4xl hover:text-white duration-500 text-primary"
//                 />
//               )
//             })}
//           </div>
//           <div className="mx-auto text-xs text-primary">
//             <p>© 2023 Cupital Group Consult. All rights reserved</p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// const footerData = [
//   {
//     title: "Featured Listings",
//     arr: [
//       "For Rent",
//       "forsale",
//       "gated communities",
//       "lands",
//       "luxury apartments",
//       "luxury holidayhomes",
//       "offplan",
//       "newbuilding",
//       "short stays",
//     ],
//   },
//   {
//     title: "Listing Categories",
//     arr: [
//       "Gasabo",
//       "Kicukiro",
//       "Nyarugenge",
//       "Bugesera",
//     ],
//   },
// ];

import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { FaXTwitter, FaWhatsapp, FaTiktok } from "react-icons/fa6";
import { FiYoutube, FiMail, FiPhone } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";

export default function Footer() {
  return (
    <>
      {/* Hero Image Section */}
      <div className="hero-image grid px-4">
        <div className="relative max-w-7xl mx-auto my-10">
          <div className="bg-black/50 absolute top-0 left-0 w-full h-full z-50"></div>
          <img
            className="w-full h-full object-cover"
            src={'/Technology & Data/aron-visuals-bZZp1PmHI0E-unsplash.jpg'}
            alt="image"
          />
        </div>
      </div>

      {/* Footer Main Section */}
      <div className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - 4 Columns with your data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-700">
            {/* Column 1 - Featured Articles/Blogs */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wider mb-4">
                CUPITAL GROUP
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/categories/how-to-invest-in-rwanda"
                  className="block text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  The Real Estate Evolution Of Luxury
                </Link>
              </div>
            </div>

            {/* Column 2 - Featured Listings */}
            <div>
              {/* <h3 className="text-base font-semibold uppercase tracking-wider mb-4">
                Featured Listings
              </h3> */}
              <div className="space-y-2">
                {/* {footerData[0].arr.map((value, index) => (
                  <Link
                    key={index}
                    href={`/categories/${value.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-sm text-gray-400 hover:text-primary transition-colors capitalize"
                  >
                    {value}
                  </Link>
                ))} */}
              </div>
            </div>

            {/* Column 3 - Listing Categories */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wider mb-4">
                Listing Categories
              </h3>
              <div className="space-y-2">
                {/* {footerData[1].arr.map((value, index) => (
                  <Link
                    key={index}
                    href={`/categories/${value.toLowerCase()}`}
                    className="block text-sm text-gray-400 hover:text-primary transition-colors capitalize"
                  >
                    {value}
                  </Link>
                ))} */}
              </div>
            </div>

            {/* Column 4 - Join Mailing List & Contact */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wider mb-4">
                Join our mailing list
              </h3>
              <form className="space-y-3 mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary/80 transition-colors"
                >
                  Submit
                </button>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy" className="mt-1" />
                  <label htmlFor="privacy" className="text-xs text-gray-400">
                    I agree to the terms in your Privacy Notice*
                  </label>
                </div>
              </form>

              <div className="mt-6">
                <h3 className="text-base font-semibold uppercase tracking-wider mb-3">
                  Contact
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <FiPhone className="text-lg" />
                    <span>+250-078-457-8531</span>
                    <span>+250-078-381-2110</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <FiMail className="text-lg" />
                    <span>info@cupital.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 py-8 border-b border-gray-700">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Privacy and Cookie Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/letting-fees" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Lettings Fees and Other Documents
            </Link>
            {/* <Link href="/aml" className="text-sm text-gray-400 hover:text-primary transition-colors">
              AML Requirements
            </Link>
            <Link href="/vacancies" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Vacancies
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Sitemap
            </Link> */}
          </div>

          {/* Bottom Section - Social Icons & Company Info */}
          <div className="pt-8">
            {/* Social Icons - Updated with your requested icons */}
            <div className="flex justify-center gap-6 mb-6 flex-wrap">
              {/* Phone ☎️ */}
              <a
                href="tel:+250784578531"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <FiPhone className="text-2xl" />
              </a>
              
              {/* Email 📧 */}
              <a
                href="mailto:info@cupital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FiMail className="text-2xl" />
              </a>
              
              {/* X (Twitter) */}
              <a
                href="https://x.com/cupitalgroup?s=11"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="X"
              >
                <FaXTwitter className="text-2xl" />
              </a>
              
              {/* Instagram IG */}
              <a
                href="https://www.instagram.com/cupitalgroup?igsh=MThkOTk2enJ5OHdjbw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <IoLogoInstagram className="text-2xl" />
              </a>
              
              {/* Facebook F */}
              <a
                href="https://www.facebook.com/?_rdc=2&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <ImFacebook2 className="text-2xl" />
              </a>
              
              {/* WhatsApp */}
              <a
                href="https://wa.me/250784578531"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
              
              {/* YouTube */}
              <a
                href="https://youtube.com/@cupitalgroup?si=YIam0uP25CYVhvtj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="text-2xl" />
              </a>
              
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@cupitalgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="text-2xl" />
              </a>
            </div>

            {/* Company Registration Info */}
            <div className="text-center text-xs text-gray-500 space-y-2">
              <p>
                CUPITAL GROUP LTD is a company registered in Rwanda. Registered number: 119617928. TIN & VAT Number: 119617928.
              </p>
              <p>
                Registered office is KG 554 st Gasabo Nyarutarama.
              </p>
              <p className="pt-4">
                © 2026 CUPITAL GROUP LTD. | Sitemap
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}