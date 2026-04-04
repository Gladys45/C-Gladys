import AllRents from "@/components/cards/AllRents";
import Link from "next/link";
import { useRouter } from "next/router";

import { IoIosArrowForward } from "react-icons/io";
const oldIMAGESRCS = [
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
  {
    imageSrc: "/assets/images/img4.jpeg",
    name: "Ubumwe Gated Estate | Richfield Kigali Estate",
  },
];
const IMAGESRCS = [
  {
    imageSrc:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },

  {
    imageSrc:
      "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];
export default function RentalDetails() {
  const { query } = useRouter();
  return (
    <div className="max-w-7xl mx-auto px-6 pt-36">
      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-lg font-light hidden sm:block">Home</h1>
        <IoIosArrowForward className="hidden sm:block" />
        <h1 className="text-lg font-light hidden sm:block">Rentals</h1>
        <IoIosArrowForward className="hidden sm:block" />
        <h1 className="sm:text-lg font-light text-[#AFAFAF]">{query.name}</h1>
      </div>
      <div className="flex gap-5">
        <div className="hidden sm:flex flex-col gap-2 sticky top-0 h-fit w-[130px]">
          {IMAGESRCS.map((val, index) => {
            return (
              <a href={`#${val.imageSrc}`} key={index}>
                <img
                  src={val.imageSrc}
                  alt=""
                  className="w-[120px] h-[70px] object-cover p-0.5 border-[1.5px] cursor-pointer border-transparent hover:border-primary duration-300 transition-all"
                />
              </a>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 gap-10 flex-1">
          <div className="hidden sm:flex gap-5 overflow-auto">
            <div className="flex-1 flex flex-col gap-4">
              {IMAGESRCS.map((v, i) => {
                return (
                  <section id={v.imageSrc} key={i}>
                    <img
                      src={v.imageSrc}
                      alt=""
                      className="w-full h-[400px] object-cover duration-300 transition-all"
                    />
                  </section>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="text-[#444444] sm:text-[40px] leading-10 text-3xl font-semibold">
              {query.name}
            </h1>
            <h1 className="text-[#676767] sm:text-[30px] leading-10 text-2xl font-light py-2">
              $2,300.00
            </h1>
            <p className="text-sm mb-5">
              Category:{" "}
              <mark className="bg-transparent text-primary">Rentals</mark>
            </p>
            <div className="flex flex-col gap-6">
              <p className="sm:text-xl text-secondary">
                Aburi is a beautiful town located in the Eastern Region of
                Rwanda, known for its stunning natural scenery and refreshing,
                pleasant climate, making it a popular destination for nature
                lovers and those seeking a quiet escape.
              </p>
              <p className="sm:text-xl text-secondary">
                Currently on the market for sale are 9 individual plots totaling
                up to about 2 acres in Aburi. These plots are situated in a
                tranquil environment with stunning views of the surrounding
                hills and valleys and easy access to good roads, perfect for
                those seeking to build their dream home or invest in real
                estate.
              </p>
              <p className="sm:text-xl text-secondary">
                The plots are suitable for private homes, townhouses, or
                apartments either for holiday homes or permanent residences.{" "}
              </p>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#444444] text-3xl font-semibold">
                  Land for sale in Aburi
                </h1>
                <p className="sm:text-xl text-secondary">
                  Investing in land in Aburi presents an ideal opportunity as
                  the town’s popularity with tourists and its close proximity to
                  Accra make it a great location. With its stunning views and
                  peaceful environment, Aburi is an ideal location to create a
                  comfortable and luxurious living or outdoor space.
                </p>
              </div>
              <p className="sm:text-xl text-secondary">
                Contact us today to learn more about these lands available for
                sale in Aburi and take the first step toward realizing your
                investment goals.
              </p>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#444444] text-3xl font-semibold">
                  Your Home Osu: A Cultural Hub in Accra
                </h1>
                <p className="sm:text-xl text-secondary">
                  Osu is celebrated for its vibrant nightlife, dining options,
                  and shopping centers from traditional to contemporary appeal.
                  It is also a hub that showcases the city’s history. This
                  apartment is the perfect unit in Osu to rent for a business
                  traveler or a tourist exploring the rich history of Accra and
                  Ghana as a whole. The cozy and tasteful furnishing creates an
                  inviting ambiance after a day of business meetings or
                  exploring the city, ensuring a restful and luxurious stay.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#444444] text-3xl font-semibold">
                  Comfortable and Convenient Apartment in Osu — A Cozy Retreat
                </h1>
                <p className="sm:text-xl text-secondary">
                  The bedroom offers enough storage, a well-designed bathroom,
                  and a balcony for natural light and air. They are furnished
                  with a TV, air conditioning, and extra sheets for comfort. The
                  open living space features a comfy sofa set, coffee table,
                  large TV, and stylish decor.
                </p>
              </div>
              <p className="sm:text-xl text-secondary">
                The fully equipped kitchen invites you to explore your culinary
                skills. Plus, there’s a provision for laundry, adding to the
                convenience of your stay.
              </p>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#444444] text-3xl font-semibold">
                  Amenities That Elevate Your Living Experience
                </h1>
                <p className="sm:text-xl text-secondary">
                  Solaris Ghana stands among luxury apartments in Osu, providing
                  a lifestyle tailored to your desires. Work-out at the gym,
                  socialize and relax at the bar/lounge, or enjoy a quick bite
                  at the cafeteria. You can find your daily essentials at
                  on-site convenience stores.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 sm:flex-row flex-col">
                  <input
                    type="text"
                    placeholder="Name"
                    className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Name of Listing"
                  className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
                />
                <textarea
                  placeholder="Name of Listing"
                  className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none h-[200px]"
                />
                <button className="w-fit bg-primary py-3 text-lg rounded-sm px-6 text-white mt-5">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20">
        <h1 className="text-4xl font-semibold mb-10">Related products</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {oldIMAGESRCS.map((v, k) => {
            return (
              <Link href={`/rentals/${v.name}`} key={k}>
                <AllRents isSmaller imgscr={v.imageSrc} text={v.name} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
