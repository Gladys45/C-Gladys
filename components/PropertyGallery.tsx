

// "use client";

// import Image from "next/image";
// import { useEffect, useMemo, useState } from "react";

// export type GalleryImage = {
//   id: string;
//   url: string;
//   altText: string | null;
//   caption: string | null;
//   title: string | null;
//   sortOrder: number | null;
//   isCover: boolean;
// };

// type PropertyGalleryProps = {
//   images: GalleryImage[];
//   title: string;
// };

// export default function PropertyGallery({
//   images,
//   title,
// }: PropertyGalleryProps) {
//   const safeImages = useMemo(() => {
//     return images.filter((image) => {
//       return (
//         image &&
//         typeof image.url === "string" &&
//         image.url.trim().length > 0
//       );
//     });
//   }, [images]);

//   const coverIndex = safeImages.findIndex((image) => image.isCover);
//   const resolvedInitialIndex = coverIndex >= 0 ? coverIndex : 0;

//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     setActiveIndex(resolvedInitialIndex);
//   }, [resolvedInitialIndex]);

//   const activeImage = safeImages[activeIndex] ?? safeImages[0] ?? null;

//   if (safeImages.length === 0) {
//     return (
//       <section className="rounded-3xl border border-gray-200 bg-white p-6">
//         <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gray-100 text-center text-sm font-medium text-gray-500">
//           No property images available
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
//         <div className="relative aspect-[16/10] w-full bg-gray-100">
//           <Image
//             src={activeImage.url}
//             alt={activeImage.altText || activeImage.title || title}
//             fill
//             priority
//             unoptimized
//             className="object-cover"
//           />
//         </div>
//       </div>

//       {(activeImage.caption || activeImage.title) && (
//         <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-600">
//           {activeImage.title ? (
//             <p className="font-medium text-gray-900">{activeImage.title}</p>
//           ) : null}
//           {activeImage.caption ? (
//             <p className={activeImage.title ? "mt-1" : ""}>
//               {activeImage.caption}
//             </p>
//           ) : null}
//         </div>
//       )}

//       {safeImages.length > 1 ? (
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//           {safeImages.map((image, index) => {
//             const isActive = index === activeIndex;

//             return (
//               <button
//                 key={image.id}
//                 type="button"
//                 onClick={() => setActiveIndex(index)}
//                 className={`overflow-hidden rounded-2xl border bg-white transition ${
//                   isActive
//                     ? "border-black"
//                     : "border-gray-200 hover:border-gray-400"
//                 }`}
//               >
//                 <div className="relative aspect-[4/3] w-full bg-gray-100">
//                   <Image
//                     src={image.url}
//                     alt={
//                       image.altText || image.title || `${title} image ${index + 1}`
//                     }
//                     fill
//                     unoptimized
//                     className="object-cover"
//                   />
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       ) : null}
//     </section>
//   );
// }

// components/PropertyGallery.tsx
import Image from "next/image";
import { useState } from "react";

type PropertyGalleryProps = {
  images: Array<{ url: string; altText?: string | null }>;
  title: string;
  isOffMarket?: boolean;
};

export default function PropertyGallery({ images, title, isOffMarket = false }: PropertyGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="relative h-96 w-full overflow-hidden rounded-3xl bg-gray-100">
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No images available
        </div>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 w-full overflow-hidden rounded-3xl bg-gray-100">
        <div className="relative h-full w-full">
          <Image
            src={currentImage.url}
            alt={currentImage.altText || title}
            fill
            className={`object-cover ${isOffMarket ? "blur-md" : ""}`}
          />
        </div>
        
        {/* OFF MARKET Overlay for main image */}
        {isOffMarket && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="border-2 border-white/50 rounded-lg bg-black/80 px-8 py-4 text-2xl font-bold tracking-wider text-white transform -rotate-12 shadow-xl">
              OFF MARKET
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                selectedImageIndex === index
                  ? "ring-2 ring-black ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${title} - image ${index + 1}`}
                fill
                className={`object-cover ${isOffMarket ? "blur-sm" : ""}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}