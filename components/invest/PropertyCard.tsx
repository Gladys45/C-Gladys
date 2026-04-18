// components/invest/PropertyCard.tsx

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InvestmentProperty } from "@/types/invest-rwanda";
import { FaMapMarkerAlt, FaTag, FaArrowsAlt } from "react-icons/fa";

type PropertyCardProps = {
  property: InvestmentProperty;
  variant?: "default" | "featured" | "compact";
  className?: string;
};

export default function PropertyCard({ 
  property, 
  variant = "default",
  className = "" 
}: PropertyCardProps) {
  const isFeatured = variant === "featured";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-gray-900 rounded-lg overflow-hidden ${className}`}
    >
      <Link href={`/invest-in-rwanda/properties/${property.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.imageSrc}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {isFeatured && (
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-3 h-3" />
              {property.location}
            </span>
            <span className="flex items-center gap-1">
              <FaTag className="w-3 h-3" />
              {property.category}
            </span>
            {property.size && (
              <span className="flex items-center gap-1">
                <FaArrowsAlt className="w-3 h-3" />
                {property.size}
              </span>
            )}
          </div>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {property.description}
          </p>
          
          {property.price && (
            <p className="text-primary font-semibold text-lg">
              {property.price}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}