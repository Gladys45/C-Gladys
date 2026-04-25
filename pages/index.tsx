

import type { GetServerSideProps, NextPage } from "next";
import HeroSection from "@/components/home/HeroSection";
import StorySection from "@/components/home/StorySection";
import GuideDownloadSection from "@/components/home/GuideDownloadSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSection from "@/components/services/ServicesSection";
import PublicFeaturedListings from "@/components/listings/FeaturedListings";
// import PublicListingsExplorer from "@/components/listings/ListingsExplorer";
import type {
  PublicListingCard,
  PublicListingRecord,
} from "@/lib/listings/types";
import { getLandingPageListings } from "@/lib/listings/service";

type Props = {
  cards: PublicListingCard[];
  records: PublicListingRecord[];
  featuredCards: PublicListingCard[];
};

type GuideFormSubmission = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  option: string;
  message?: string;
};

type SendFormEmailResponse = {
  success: boolean;
  message: string;
};

const HomePage: NextPage<Props> = ({ cards, records, featuredCards }) => {
  const safeCards = Array.isArray(cards) ? cards : [];
  const safeRecords = Array.isArray(records) ? records : [];
  const safeFeaturedCards = Array.isArray(featuredCards) ? featuredCards : [];

  const handleGuideFormSubmit = async (
    data: GuideFormSubmission,
  ): Promise<void> => {
    try {
      const response = await fetch("/api/send-form-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber ?? "",
          interest: data.option,
          message: data.message ?? "",
        }),
      });

      const result = (await response.json()) as SendFormEmailResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form.");
      }

      alert("Your request has been submitted successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the form.";

      console.error("Guide form submission failed:", error);
      alert(message);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        headline="Creativity. Intelligent. Technology."
        subheadline="Setting the New Standard"
      />

      <StorySection
        id="our_story"
        title="The Cupital Group Story"
        backgroundImageSrc="/assets/frame1.jpg"
        paragraphs={[
          "Cupital Group Ltd’s dedication to working with integrity and providing clients with an unparalleled level of service and discretion has made the company a trusted choice for luxury real estate representation. Serving a wide range of clients, from those looking for retirement properties and vacation homes to clients seeking the very best in luxury houses, condominiums, and townhomes, Cupital Group understands the premium property market in Kigali and across Rwanda and knows how to position exceptional properties successfully.",
          "Cupital Group Ltd helps clients visualize and achieve their ideal lifestyle through access to some of Kigali’s most spectacular luxury condominiums and estates. Property investment remains one of the strongest investment decisions in Rwanda, and our service as a real estate partner provides the guidance and market insight needed to make informed decisions. Whether you are a Rwandan living locally, a member of the diaspora, or an international investor exploring real estate opportunities in Rwanda, the experience and market knowledge behind Cupital Group ensure dependable support throughout the purchasing journey.",
        ]}
        nextAnchorHref="#our_story_two"
      />

      <GuideDownloadSection
        id="our_story_two"
        imageSrc="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        leftText={[
          "Cupital Group's team of talented professionals includes administrative staff, qualified buyer specialists, and client service assistants. This team ensures that every client receives service delivered with professionalism, integrity, and a high ethical standard throughout the property journey.",
          "Our continued commitment to excellence in marketing and selling luxury condominiums and homes, combined with strong negotiation expertise, has helped establish Cupital Group as a respected name in premium real estate. The business is frequently valued for its deep market knowledge and its ability to guide clients confidently through high-value real estate decisions.",
        ]}
        title="Fill the Form Below to Download My Real Estate Guide"
        options={[
          { value: "invest", label: "I want to invest in Rwanda" },
          { value: "rentals", label: "I need long term rentals in Rwanda" },
        ]}
        onSubmit={handleGuideFormSubmit}
      />

      <TestimonialsSection id="testimonials" />

      <ServicesSection
        id="services"
        title="Property Services"
        subtitle="From selling and buying to renting, letting, international property, and negotiation, we support clients through every stage of the property journey."
      />

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Find verified property opportunities with live database listings
            </h2>
            <p className="text-lg text-neutral-300">
              Browse houses and land directly from our published property database.
            </p>
          </div>
        </div>
      </section>

      <PublicFeaturedListings listings={safeFeaturedCards} />
      {/* <PublicListingsExplorer cards={safeCards} records={safeRecords} /> */}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const result = await getLandingPageListings();

    return {
      props: {
        cards: Array.isArray(result?.cards) ? result.cards : [],
        records: Array.isArray(result?.records) ? result.records : [],
        featuredCards: Array.isArray(result?.featuredCards)
          ? result.featuredCards
          : [],
      },
    };
  } catch (error) {
    console.error("Failed to load landing page listings:", error);

    return {
      props: {
        cards: [],
        records: [],
        featuredCards: [],
      },
    };
  }
};

export default HomePage;