import classNames from "classnames";
import Link from "next/link";

export default function MayAlsoLike({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden shadow-2xl rounded group/main cursor-pointer">
      <img
        src={imgSrc}
        className="object-cover w-full h-[250px] group-hover/main:scale-105 duration-300 transition-all"
        alt=""
      />
      <div className="px-8 py-8">
        <div className="flex flex-wrap gap-x-2 gap-y-3">
          {[
            "Kigali",
            "ForRent",
            "ForSale",
            "Gated",
            "Communities",
            "OffPlan",
            "Ready Built",
          ].map((value, index) => {
            return (
              <Link
                href={value}
                className={
                  "relative group text-[#676767] text-sm font-semibold"
                }
                key={index}
              >
                {value}
                <div
                  className={classNames({
                    "absolute bottom-0 group-hover:w-full w-[0%] h-0.5 bg-primary transition-all duration-300":
                      true,
                  })}
                />
              </Link>
            );
          })}
          <h1 className="text-[#444444] text-3xl font-semibold">{name}</h1>
        </div>
      </div>
    </div>
  );
}
