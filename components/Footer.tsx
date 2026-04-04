import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="hero-image grid px-4">
        <div className="relative  max-w-7xl mx-auto my-10">
          <div className="bg-black/50 absolute top-0 left-0 w-full h-full z-50"></div>
          <img
            className="w-full h-full"
            src={'/assets/images/img10.jpeg'}
            alt="image"
          />
        </div>
      </div>
      <div className="bg-black text-white py-14 ">
        <div className="grid sm:grid-cols-4 px-6 max-w-7xl mx-auto text-center">
          <div className="">
            <div>
              <h1 className="text-base text-start uppercase">
                Featured Articles/Blogs
              </h1>
            </div>
            <div className="space-y-2 text-sm mt-4">
              {["How to invest in Rwanda's vibrant real estate space"].map(
                (value, index) => {
                  return (
                    <Link href={`/categories/${value}`} className="px-4 flex">
                      <p className="list-item"></p>
                      <p className="text-start   capitalize cursor-pointer text-primary hover:text-white duration-500">
                        {value}
                      </p>
                    </Link>
                  )
                }
              )}
            </div>
            {/* <div className="space-y-2 text-sm mt-4">
              <h1 className="text-base text-start uppercase">
                FEATURED ARTICLES/BLOGS
              </h1>
              {[
                "How to invest in Rwanda's vibrant real estate space",
                'kass towers',
                'outskirts resort rwanda',
              ].map((value, index) => {
                return (
                  <Link
                    className="px-4 flex"
                    href={`/categories/belmonte/${value}`}
                  >
                    <p className="list-item"></p>
                    <p className="text-start   capitalize cursor-pointer text-primary hover:text-white duration-500">
                      {value}
                    </p>
                  </Link>
                )
              })}
            </div> */}
          </div>
          <div className="grid grid-cols-2 col-span-2 sm:mt-0 mt-4">
            {footerData.map((value, index) => {
              return (
                <div>
                  <h1 className="text-base uppercase mb-2">{value.title}</h1>
                  <div className="space-y-2 text-sm flex flex-col">
                    {value.arr.map((value, index) => {
                      return (
                        <Link
                          className="capitalize text-primary hover:text-white duration-500 cursor-pointer"
                          key={index}
                          href={`/categories/${value}`}
                        >
                          {value}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="sm:mt-0 mt-4">
            <div>
              <h1 className="text-base uppercase ">Join our mailing list</h1>
            </div>
            <div className="mt-6">
              <button className="py-4 hover:-translate-y-1 duration-500 uppercase bg-primary text-white text-lg rounded-sm font-medium px-10 ">
                Suscribe
              </button>
            </div>
            <div className="space-y-2 text-xl mt-4">
              {['sitemap', 'aboutus', 'termsofservices', 'privacypolicy'].map(
                (value, index) => {
                  return (
                    <div>
                      <p className="capitalize cursor-pointer text-primary hover:text-white duration-500">
                        {value}
                      </p>
                    </div>
                  )
                }
              )}
            </div>
            <div className="space-y-1 text-xl mt-8">
              <h1 className="text-xl uppercase mb-2">Contact</h1>
              {['+250-078-457-8531', '+250-078-381-2110'].map(
                (value, index) => {
                  return (
                    <div>
                      <p className="capitalize font-medium cursor-pointer text-primary hover:text-white duration-500">
                        {value}
                      </p>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
        <div className="grid pt-14">
          {/* <div className="mx-auto">
            <img
              className="object-cover object-center h-10 sm:h-24"
              src="https://anaarkutu.com/wp-content/uploads/2022/10/Ana-Arkutu-600x170.png"
              alt="image"
            />
          </div> */}
          <div className="mx-auto flex py-8 gap-5 sm:gap-10 flex-wrap">
            {[
              'entypo-social:facebook',
              'ri:instagram-line',
              'icomoon-free:whatsapp',
              'cib:linkedin',
              'simple-icons:youtube',
              'octicon:mail-16',
              // 'healthicons:phone-negative',
            ].map((value, index) => {
              return (
                <Icon
                  icon={`${value}`}
                  className="text-lg sm:text-4xl hover:text-white duration-500 text-primary"
                />
              )
            })}
          </div>
          <div className="mx-auto text-xs text-primary">
            <p>© 2023 Cupital Group Consult. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}

const footerData = [
  {
    title: "Featured Listings",
    arr: [
      "For Rent",
      "forsale",
      "gated communities",
      "lands",
      "luxury apartments",
      "luxury holidayhomes",
      "offplan",
      "newbuilding",
      "short stays",
    ],
  },
  {
    title: "Listing Categories",
    arr: [
      "Gasabo",
      "Kicukiro",
      "Nyarugenge",
      "Bugesera",
    ],
  },
];
