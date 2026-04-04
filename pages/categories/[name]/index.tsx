import LocationCard from "@/components/cards/LocationCard";
import { data } from "@/pages/location";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosSearch } from "react-icons/io";

export default function Page() {
  const { query } = useRouter();
  return (
    <div className="max-w-7xl px-6 mx-auto pt-24">
      <div>
        <p className="text-[#607388] text-lg font-light">Category</p>
        <h1 className="text-3xl sm:text-6xl text-[#444444] font-semibold mt-2 mb-5">
          For {query.name}
        </h1>
        <hr className="mb-10 border-[#e6eaee]" />
      </div>
      <div className="grid sm:grid-cols-3 gap-10">
        <div className="col-span-2 grid-rows-1 gap-4 w-full grid grid-cols-2">
          {data.map((val, index) => {
            return (
              <Link
                href={`${query.name}/${val.text} House`}
                key={index}
                className={classNames({
                  "col-span-2 row-span-1 h-[250px] sm:h-[500px]":
                    index % 3 === 0,
                  "col-span-1": index % 3 !== 0,
                })}
              >
                <LocationCard
                  key={index}
                  isRight={true}
                  src={val.img.src}
                  text={val.text}
                />
              </Link>
            );
          })}
        </div>
        <div className="hidden sm:block w-full">
          <div className="bg-[#F5F5F5] px-3 py-3 rounded-[5px] flex items-center justify-between">
            <input
              className="border-none bg-transparent outline-none placeholder:text-sm w-full"
              placeholder="Search..."
            />
            <IoIosSearch className="text-xl text-primary" />
          </div>
          <div className="mt-10">
            <h5 className="font-semibold text-sm">Recent Posts</h5>
            <div className="flex flex-col gap-2 mt-2">
              {[
                "Prime Apartments in Kigali: Where Luxury Meets Convenience",
                "Serene Gated Estate | Richfield Lifestyle Estate",
                "Private Island Resort Investment | Shark Island Resort & Residence",
                "The Kensington Heights in Airport City Kumasi The",
                "Rwanda",
              ].map((val, index) => {
                return (
                  <h1
                    key={index}
                    className="cursor-pointer hover:text-primary text-[#676767] text-xl duration-300 transition-all font-light"
                  >
                    {val}
                  </h1>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
