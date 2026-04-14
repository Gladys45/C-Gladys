// "use client";
// import { MdKeyboardArrowUp } from "react-icons/md";
// import { useWindowScroll } from "react-use";
// export default function ButtonTop() {
//   const { y } = useWindowScroll();
//   const isGreaterThan100 = y >= 200;
//   return (
//     isGreaterThan100 && (
//       <a
//         href="#top"
//         className="fixed bottom-8 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center right-8 overflow-hidden"
//       >
//         <div className="w-full h-full flex items-center justify-center relative group z-50">
//           <MdKeyboardArrowUp className="text-white z-50" />
//           <div className=" absolute bottom-0 w-full bg-primary z-30 h-0 duration-300 transition-all group-hover:h-full" />
//         </div>
//       </a>
//     )
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useWindowScroll } from "react-use";

export default function ButtonTop() {
  const { y } = useWindowScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isVisible = mounted && y >= 200;

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed right-8 bottom-8 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black/60 transition-all duration-300 ${
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="group relative z-50 flex h-full w-full items-center justify-center">
        <MdKeyboardArrowUp className="z-50 text-white" />
        <div className="bg-primary absolute bottom-0 z-30 h-0 w-full transition-all duration-300 group-hover:h-full" />
      </div>
    </a>
  );
}