import React from "react";
import { motion } from "framer-motion";

export default function Contact_us() {
  return (
    <div className="bg-[#D4D8E0] h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-28">
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="m-auto sm:block hidden">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <picture>
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/171944925.jpg?k=f23e2783abdafbd44a6c23bc0038ef38f00ed5bc1683de9bda3d7f1089a035b7&o=&hp=1"
                  alt=""
                  className="rounded-sm"
                  width={450}
                />
              </picture>
            </motion.div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl">Hello & Welcome</h1>
              <p className="text-lg">
                I look forward to guiding you into making an ideal real estate
                purchase. Please share your details and I will respond to you
                within 24 hours.
              </p>
            </div>
            <p className="text-lg">
              <i>With warm regards, Cupital Group</i>
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 sm:flex-row flex-col">
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                />
              </div>

              <div className="border border-[#CCCCCC] bg-white text-[#757575] w-full py-2 px-3 rounded-sm outline-none">
                <select className="w-full outline-none">
                  <option selected disabled value="">
                    Select Listing or Article to Enquire About
                  </option>
                  <option>I want to invest in Rwanda</option>
                  <option>I need long term rentals in Rwanda</option>
                </select>
              </div>
              <textarea
                placeholder="Message"
                className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none h-[200px]"
              />
              <button className="w-fit bg-primary py-3 text-lg rounded-sm px-6 text-white mt-5 sm:mb-0 mb-10">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
