// components/invest/PropertyGrid.tsx

"use client";
import { InvestmentProperty } from "@/types/invest-rwanda";
import PropertyCard from "./PropertyCard";

type PropertyGridProps = {
  properties: InvestmentProperty[];
  title?: string;
  columns?: 2 | 3 | 4;
};

export default function PropertyGrid({ 
  properties, 
  title, 
  columns = 3 
}: PropertyGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {title}
          </h2>
        )}
        
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}