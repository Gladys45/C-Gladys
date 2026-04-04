export type TeamMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;

  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };

  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    x?: string;
  };
};