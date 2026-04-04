import img1 from "../public/assets/images/img1.jpeg";
import img2 from "../public/assets/images/img2.jpeg";
import img3 from "../public/assets/images/img3.jpg";
import img4 from "../public/assets/images/img4.jpeg";
import LocationCard from "../components/cards/LocationCard";
import Link from "next/link";

export default function Location() {
  return (
    <div>
      <div className="pt-32 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 grid-cols-1">
          {data.map((value, index) => {
            return (
              <Link href={`/categories/${value.text}`} key={index}>
                <LocationCard src={value.img.src} text={value.text} />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="px-3 grid py-14">
        <div className="max-w-2xl mx-auto px-4 w-full">
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
      </div>
    </div>
  );
}

export const data = [
  {
    img: img2,
    text: "Kicukiro",
  },
  {
    img: img1,
    text: "Nyarugenge",
  },
  {
    img: img3,
    text: "Gasabo",
  },
  {
    img: img4,
    text: "Huye",
  },
  {
    img: img1,
    text: "Kagarama",
  },
  {
    img: img2,
    text: "Nyamirambo",
  },
  {
    img: img3,
    text: "Nyaruguru",
  },
  {
    img: img4,
    text: "Gisagara",
  },
  {
    img: img1,
    text: "Gatenga",
  },
  {
    img: img2,
    text: "Nyarirambo",
  },
  {
    img: img3,
    text: "Gatsata",
  },
  {
    img: img4,
    text: "Muhima",
  },
  {
    img: img1,
    text: "Gikondo",
  },
  {
    img: img2,
    text: "Kamonyi",
  },
  {
    img: img3,
    text: "Musanze",
  },
];
