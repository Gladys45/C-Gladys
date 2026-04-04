import AllImageToSlide from "@/components/AllImageToSlide";
import MayAlsoLike from "@/components/cards/MayAlsoLike";
import Link from "next/link";
import { useRouter } from "next/router";

export const IMAGESRCS = [
  {
    imageSrc:
      "https://anaarkutu.com/wp-content/uploads/2023/02/Mountain-Jewel-Artboard-1-copy-2.jpg",
    name: "Serene Gated Estate | Richfield Lifestyle Estate",
  },
  {
    imageSrc: "/assets/images/img1.jpeg",
    name: "4point Gated Estate | Rwanda Lifestyle Europe",
  },
  {
    imageSrc: "/assets/images/img2.jpeg",
    name: "Ubumwe Gated Estate | Richfield Kigali Estate",
  },
];
export default function House() {
  const { query } = useRouter();
  return (
    <div className="w-full relative">
      <div className="h-[600px] relative flex items-center justify-center overflow-hidden">
        <img
          src="https://anaarkutu.com/wp-content/uploads/2023/02/Mountain-Jewel-Artboard-1-copy-2.jpg"
          alt="relative"
          className="absolute w-full h-full top-0 left-0 object-cover fadeOut"
        />
        <div className="absolute top-0 right-0 bg-black/40 w-full h-full" />
        <div className="z-50 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {["Kigali", "For Sale", "Lands"].map((val, index) => {
              return (
                <button
                  key={index}
                  className="border-[1.5px] rounded-md border-[#B6A69E] hover:bg-primary hover:text-white hover:border-primary relative top-0 hover:-top-1 text-white px-2.5 text-[13px] font-bold py-1 transition-all duration-500"
                >
                  {val}
                </button>
              );
            })}
          </div>
          <h1 className="text-3xl sm:text-7xl text-white font-medium max-w-3xl text-center">
            {query.house}
          </h1>
        </div>
      </div>
      <div className="px-6 max-w-5xl mx-auto py-20 flex flex-col gap-8">
        <div className="flex items-center gap-2 relative group w-fit cursor-pointer">
          <img src="/assets/images/rwanda_1.png" width={15} alt="" />
          <span className="text-[#676767] text-lg font-semibold">Kigali</span>
          <div className="absolute bottom-0 right-0 group-hover:w-[0%] w-[100%] h-0.5 bg-black transition-all duration-300" />
        </div>
        <p className="sm:text-xl text-secondary">
          Aburi is a beautiful town located in the Eastern Region of Rwanda,
          known for its stunning natural scenery and refreshing, pleasant
          climate, making it a popular destination for nature lovers and those
          seeking a quiet escape.
        </p>
        <AllImageToSlide
          images={[
            "https://anaarkutu.com/wp-content/uploads/2023/02/Mountain-Jewel-Artboard-1-copy-2.jpg",
            "/assets/images/img1.jpeg",
            "/assets/images/img2.jpeg",
            "/assets/images/img3.jpg",
            "/assets/images/img4.jpeg",
          ]}
        />
        <p className="sm:text-xl text-secondary">
          Currently on the market for sale are 9 individual plots totaling up to
          about 2 acres in Aburi. These plots are situated in a tranquil
          environment with stunning views of the surrounding hills and valleys
          and easy access to good roads, perfect for those seeking to build
          their dream home or invest in real estate.
        </p>
        <p className="sm:text-xl text-secondary">
          The plots are suitable for private homes, townhouses, or apartments
          either for holiday homes or permanent residences.{" "}
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-[#444444] text-3xl font-semibold">
            Land for sale in Aburi
          </h1>
          <p className="sm:text-xl text-secondary">
            Investing in land in Aburi presents an ideal opportunity as the
            town’s popularity with tourists and its close proximity to Accra
            make it a great location. With its stunning views and peaceful
            environment, Aburi is an ideal location to create a comfortable and
            luxurious living or outdoor space.
          </p>
        </div>
        <p className="sm:text-xl text-secondary">
          Contact us today to learn more about these lands available for sale in
          Aburi and take the first step toward realizing your investment goals.
        </p>
      </div>
      <div className="bg-[#F5F5F5] py-20">
        <div className="px-6 max-w-7xl mx-auto">
          <h1 className="text-[#444444] text-3xl font-semibold">
            You May Also Like
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
            {IMAGESRCS.map((val, idx) => {
              return (
                <Link
                  href={val.name}
                  key={idx}
                  className="h-full relative flex"
                >
                  <MayAlsoLike imgSrc={val.imageSrc} name={val.name} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
