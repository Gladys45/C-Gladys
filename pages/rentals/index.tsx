import AllRents from "@/components/cards/AllRents";
import LocationCard from "@/components/cards/LocationCard";
import classNames from "classnames";
import Link from "next/link";
import { IMAGESRCS } from "../categories/[name]/[house]";
import { data } from "../location";

export default function Rentals() {
  return (
    <div>
      <div className="h-[200px] sm:h-[400px] bg-black flex flex-col justify-end">
        <div className="mx-auto max-w-7xl w-full px-6 pb-16">
          <h1 className="text-3xl text-primary sm:text-6xl">
            Find properties for rent
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {IMAGESRCS.map((v, k) => {
            return (
              <Link href={`/rentals/${v.name}`} key={k}>
                <AllRents imgscr={v.imageSrc} text={v.name} />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-semibold mb-10">
            Other properties available for rent
          </h1>
          <div className="grid gap-10">
            <div className="gap-4 w-full grid sm:grid-cols-4">
              {data.map((val, index) => {
                return (
                  <Link
                    href={`/categories/all/${val.text} House`}
                    key={index}
                    className={classNames({
                      "sm:col-span-2 row-span-1 h-[250px] sm:h-[500px]":
                        index % 3 === 0,
                      "sm:col-span-1": index % 3 !== 0,
                    })}
                  >
                    <LocationCard
                      key={index}
                      isRight={true}
                      textSize={true}
                      src={val.img.src}
                      text={val.text}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
