"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function InvertButton() {
  const [modalOpenone, setModalOpenone] = useState(false);

  const closeone = () => setModalOpenone(false);
  const openone = () => setModalOpenone(true);
  return (
    <>
      <div className="flex flex-col gap-4"></div>
      {modalOpenone && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80  blur-2xl"></div>
      )}
    </>
  );
}
