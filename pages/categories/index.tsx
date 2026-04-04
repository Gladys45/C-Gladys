import Link from "next/link";
import LocationCard from "../../components/cards/LocationCard";
import { data } from "../location";

export default function Categories() {
  return (
    <div>
      <div className="pt-32 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 grid-cols-1">
          {data.map((value, index) => {
            return (
              <Link href={`/categories/${value.text}`}>
                <LocationCard
                  key={index}
                  src={value.img.src}
                  text={value.text}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="px-3 grid max-w-6xl mx-auto sm:grid-cols-2 py-14">
        <div className=" mx-auto px-4 w-full">
          <iframe
            width="500"
            height="350"
            className="object-cover object-center w-full"
            src="https://www.youtube.com/embed/y9j-BL5ocW8"
            title="Cinematic Real estate video tour example 4K | Laowa 12mm &amp; Sony A7III"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mx-auto px-4 w-full">
          <iframe
            width="500"
            height="350"
            className="object-cover object-center w-full"
            src="https://www.youtube.com/embed/mJVuZiK9a6I"
            title="The WORLD&#39;S SMOOTHEST cinematic PROPERTY VIDEO | SONY FX6"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
