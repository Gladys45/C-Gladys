import classNames from "classnames";

export default function LocationCard({
  src,
  text,
  className,
  textSize,
  isRight,
}: {
  src: string;
  text: string;
  className?: string;
  textSize?: boolean;
  isRight?: boolean;
}) {
  return (
    <div
      className={classNames(
        {
          "w-full group h-full overflow-hidden rounded-lg cursor-pointer relative":
            true,
        },
        className
      )}
    >
      <img
        className="aspect-square duration-300 object-cover object-center group-hover:scale-110 h-full w-full"
        src={src}
        alt={text}
      />
      <div className="absolute duration-300 inset-0 h-full w-full group-hover:opacity-70 bg-black z-30 opacity-50"></div>
      <p
        className={classNames({
          "text-white absolute z-40 transform": true,
          "text-center left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0":
            !isRight,
          "text-left left-10 bottom-5 font-light": isRight,
          "text-xl sm:text-3xl": !textSize,
          "text-xl sm:text-4xl font-semibold": textSize,
        })}
      >
        {isRight ? `House ${text}` : text}
      </p>
    </div>
  );
}
