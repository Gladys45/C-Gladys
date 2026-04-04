// import Link from "next/link";
// import type { Service } from "@/data";

// export default function ServiceCard({ service }: { service: Service }) {
//   return (
//     <div className="group rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-md transition">
      
//       <div className="h-52 overflow-hidden">
//         <img
//           src={service.image}
//           alt={service.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition"
//         />
//       </div>

//       <div className="p-6 flex flex-col gap-3">
//         <h3 className="text-xl font-semibold">{service.name}</h3>

//         <p className="text-sm text-neutral-600">
//           {service.description}
//         </p>

//         {service.href && (
//           <Link
//             href={service.href}
//             className="mt-2 text-sm font-semibold text-primary hover:underline"
//           >
//             {service.ctaLabel ?? "Learn more"}
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }


import Link from "next/link";
import type { ServiceCard as ServiceCardType, ServiceRecord } from "@/data";

type ServiceCardProps = {
  service: ServiceCardType | ServiceRecord;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const description =
    "description" in service ? service.description : undefined;

  return (
    <div className="group rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-6 flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-neutral-900">
          {service.name}
        </h3>

        {description && (
          <p className="text-sm text-neutral-600 leading-6">
            {description}
          </p>
        )}

        {service.href && (
          <Link
            href={service.href}
            className="mt-2 text-sm font-semibold text-primary hover:underline"
          >
            {service.ctaLabel ?? "Learn more"}
          </Link>
        )}
      </div>
    </div>
  );
}