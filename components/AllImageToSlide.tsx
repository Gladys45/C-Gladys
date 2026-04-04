"use client";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export default function AllImageToSlide({ images }: { images: string[] }) {
  const [img, setImg] = useState(0);
  return (
    <div className="relative w-full h-[300px] overflow-hidden sm:h-[500px]">
      <div className="absolute top-2 left-2 flex items-center gap-2 z-50">
        <button
          className="flex items-center justify-center w-6 h-6 rounded-sm bg-primary"
          onClick={() =>
            img === 0 ? setImg(images.length - 1) : setImg((prev) => prev - 1)
          }
        >
          <IoIosArrowBack className="text-white text-sm" />
        </button>
        <button
          onClick={() =>
            img === images.length - 1 ? setImg(0) : setImg((prev) => prev + 1)
          }
          className="flex  items-center justify-center w-6 h-6 rounded-sm bg-primary"
        >
          <IoIosArrowForward className="text-white text-sm" />
        </button>
      </div>
      <motion.div initial={{ opacity: 0 }} key={img} animate={{ opacity: 1 }}>
        <img
          src={images[img]}
          alt="relative"
          className="absolute w-full h-full top-0 left-0 object-cover"
        />
      </motion.div>
    </div>
  );
}
