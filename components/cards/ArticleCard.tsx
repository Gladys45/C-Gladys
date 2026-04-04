// @ts-nocheck
import classNames from "classnames";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ArticleCard({ imageSrc }) {
  const [mousePosition, setMousePosition] = useState({});
  const boxRef = useRef();
  const handleMouseMove = (e) => {
    setMousePosition(getRelativeCoordinates(e, boxRef.current));
  };
  return (
    <motion.div
      ref={boxRef}
      className="relative flex flex-col items-start justify-start min-h-[350px] group overflow-hidden duration-700 transition-all cursor-pointer"
      style={{ perspective: 600 }}
      onMouseMove={(e) => handleMouseMove(e)}
      animate={{
        rotateX: mousePosition.centerX * 20,
        rotateY: mousePosition.centerY * 20,
      }}
    >
      <motion.div
        className={classNames({
          [`absolute w-[90px] h-[90px] hidden group-hover:flex bg-black  items-center justify-center z-[1000] -translate-y-1/2 rounded-full`]:
            true,
        })}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <span className="text-sm text-white">View</span>
      </motion.div>

      <img
        src={imageSrc}
        alt=""
        className="w-full h-full absolute top-0 left-0 z-20 object-cover group-hover:scale-105 duration-300 transition-all"
      />
      <div className="absolute top-0 h-full w-full left-0 bg-black/30 z-40" />
      <div className="flex flex-col gap-2 px-5 z-50 py-8">
        <h4 className="text-white font-light text-xl">Article</h4>
        <p className="text-2xl font-semibold text-white">
          Prime Apartments in Accra: Where Luxury Meets Convenience
        </p>
      </div>
    </motion.div>
  );
}

function getRelativeCoordinates(event, referenceElement) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  let reference = referenceElement.offsetParent;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left - 50,
    y: position.y - offset.top - 50,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY:
      (position.y - offset.top - offset.height / 2) / (offset.height / 2),
  };
}
