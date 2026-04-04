import classNames from "classnames";

export default function AllRents({
  imgscr,
  text,
  isSmaller,
}: {
  imgscr: string;
  text: string;
  isSmaller?: boolean;
}) {
  return (
    <div className="relative cursor-pointer group hover:z-[1000] z-50">
      <div className="w-full h-full duration-300 transition-all group-hover:scale-110 left-0 right-0 bg-transparent group-hover:bg-white group-hover:shadow-2xl rounded absolute -z-10" />
      <img
        src={imgscr}
        alt=""
        className={classNames({
          "rounded w-full object-cover": true,
          "h-[450px]": !isSmaller,
          "h-[350px]": isSmaller,
        })}
      />
      <div className="px-5 py-5 pb-5 group-hover:scale-105 duration-300 transition-all ">
        <p className="text-lg font-medium text-[#444444]">{text}</p>
        <h4 className="text-lg font-medium">$1,400.00</h4>
      </div>
    </div>
  );
}
