"use client";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useWindowScroll } from "react-use";
export default function ButtonTop() {
  const { y } = useWindowScroll();
  const isGreaterThan100 = y >= 200;
  return (
    isGreaterThan100 && (
      <a
        href="#top"
        className="fixed bottom-8 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center right-8 overflow-hidden"
      >
        <div className="w-full h-full flex items-center justify-center relative group z-50">
          <MdKeyboardArrowUp className="text-white z-50" />
          <div className=" absolute bottom-0 w-full bg-primary z-30 h-0 duration-300 transition-all group-hover:h-full" />
        </div>
      </a>
    )
  );
}
