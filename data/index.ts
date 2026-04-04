// // data/index.ts
// export type Testimonial = {
//   id: string;
//   content: string;
//   author: string;
//   role?: string; // optional (e.g. Landlord, Investor)
// };

// export type Listing = {
//   id: string;
//   name: string;
//   image: string;
//   href: string;
//   tag?: string;
// };

// export type TeamMember = {
//   id: string;
//   name: string;
//   title: string;
//   image: string;
//   socials?: {
//     x?: string;
//     instagram?: string;
//     facebook?: string;
//     linkedin?: string;
//   };
// };

// export type Service = {
//   id: string;
//   name: string;
//   description: string;
//   href?: string;
//   featured?: boolean;
// };

// export type Property = {
//   id: string;
//   name: string;
//   location: string;
//   priceLabel?: string;
//   image: string;
//   category?: string; // off-plan, new-build, rental...
//   href: string;
// };

// export const data = {
//   testimonials: [
//     {
//       id: "t-1",
//       content:
//         "Buying an off plan property for the first time is no easy, but I got a Very good advice, service in this first venture into off plan property and has been a very positive experience and very profitable.",
//       author: "GRAHAM K.",
//     },
//     {
//       id: "t-2",
//       content:
//         "Hi dear Friends, today I phoned up cupital group and answered all my questions kindly and professionally sent all the documents I needed (urgently). It was delightful and easy. Heartfelt thank you.",
//       author: "DANIELA",
//       role: "Landlord",
//     },
//     {
//       id: "t-3",
//       content:
//         "Thrilled with Cupital Group's years of support! They guided me from nervous first-time buyer to confident investor. Their friendly, passionate consultants are always available, even for late-night calls. They handle everything, making property buying stress-free. Highly recommend them!",
//       author: "SAMUEL",
//       role: "Landlord",
//     },
//   ] satisfies Testimonial[],

//   // keep your old “Featured Listings” compatible
//   listings: [
//     {
//       id: "l-1",
//       name: "Hyacinth",
//       image: "/assets/images/img1.jpeg",
//       href: "/categories/Hyacinth",
//       tag: "Featured",
//     },
//     {
//       id: "l-2",
//       name: "Heritage 100",
//       image: "/assets/images/img2.jpeg",
//       href: "/categories/Heritage%20100",
//       tag: "Featured",
//     },
//   ] satisfies Listing[],

//   // empty for now — you’ll fill this when we build Team
//   team: [] satisfies TeamMember[],

//   services: [] satisfies Service[],

//   properties: [] satisfies Property[],
// } as const;



// data/index.ts
export * from "./models/testimonials";
export * from "./models/team";
export * from "./models/listings";
export * from "./models/services";
export * from "./seed/service.seed";
export * from "./models/services";
export { TESTIMONIALS_SEED } from "./seed/testimonials.seed";
export { TEAM_SEED } from "./seed/team.seed";
export { LISTING_RECORDS_SEED, LISTING_CARDS_SEED } from "./seed/listings.seed";

export { getTestimonials } from "./queries/testimonials.query";
export { getTeam, getTeamMemberById } from "./queries/team.query";
export { getListingBySlug, filterListings } from "./queries/listings.query";




export { SERVICE_RECORDS_SEED, SERVICE_CARDS_SEED } from "./seed/service.seed";

export { getServiceBySlug, getFeaturedServices } from "./queries/service.query";