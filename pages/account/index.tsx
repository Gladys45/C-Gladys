

// import type { NextPage } from "next";
// import Link from "next/link";

// const AccountPage: NextPage = () => {
//   return (
//     <main className="min-h-screen bg-[#FAFAFA] pt-32 px-4">
//       <div className="max-w-3xl mx-auto text-center">
//         <h1 className="text-3xl sm:text-4xl font-bold text-black">Account</h1>
//         <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
//           Access the login and registration pages for your account area.
//         </p>

//         <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
//           <Link
//             href="/account/login"
//             className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-black px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
//           >
//             Login
//           </Link>

//           <Link
//             href="/account/register"
//             className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:opacity-90"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AccountPage;


import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";
import ListingsExplorer from "@/components/listings/ListingsExplorer";
import ServicesSection from "@/components/services/ServicesSection";
import type { NextPage } from "next";
import Link from "next/link";

const AccountPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-black">Account</h1>
        <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
          {/* Access the login and registration pages for your account area. */}


                <ServicesSection
              id="services"
              title="Property Services"
              subtitle="From selling and buying to renting, letting, international property, and negotiation, we support clients through every stage of the property journey."
            />
                
                 <ListingsExplorer />
                 
          
                {/* <FeaturedListingsSection id="listings" title="Featured Listings" items={LISTINGS} /> */}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/account/login"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-black px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/account/register"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:opacity-90"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;