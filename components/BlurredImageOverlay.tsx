// // components/BlurredImageOverlay.tsx
// interface BlurredImageOverlayProps {
//   children: React.ReactNode;
//   isBlurred: boolean;
//   overlayText?: string;
// }

// export function BlurredImageOverlay({ 
//   children, 
//   isBlurred, 
//   overlayText = "OFF MARKET" 
// }: BlurredImageOverlayProps) {
//   if (!isBlurred) return <>{children}</>;
  
//   return (
//     <div className="relative">
//       <div className="filter blur-md">
//         {children}
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//         <div className="bg-black/80 text-white px-6 py-3 rounded-lg font-bold text-xl tracking-wider transform -rotate-12 border-2 border-white/50 shadow-xl">
//           {overlayText}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Usage in PropertyCard:
// <BlurredImageOverlay isBlurred={isOffMarket} overlayText="OFF MARKET">
//   <Image
//     src={property.coverImage}
//     alt={property.coverImageAlt}
//     fill
//     className="object-cover transition-transform duration-300 group-hover:scale-105"
//   />
// </BlurredImageOverlay>