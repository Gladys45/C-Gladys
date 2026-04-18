// components/invest/InvestHero.tsx

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

type InvestHeroProps = {
  title: string;
  backgroundImage: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function InvestHero({ 
  title, 
  backgroundImage, 
  buttonText = "Download Your Real Estate Guide",
  onButtonClick 
}: InvestHeroProps) {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={backgroundImage}
          alt="Invest in Rwanda"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <motion.div
        className="absolute inset-0 flex items-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              {title}
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onButtonClick}
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 px-8 py-3 rounded-lg text-white font-semibold transition-all shadow-lg"
            >
              <span>{buttonText}</span>
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}