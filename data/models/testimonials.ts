export type Testimonial = {
  id: string;
  content: string;
  author: string;
  role?: string; // optional: Landlord, Investor...
  createdAtISO?: string;
};