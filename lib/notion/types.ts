export interface Workshop {
  id: string;
  name: string;
  description: string;
  audienceLevel: string[];
  duration: string;
  maxParticipants: number | null;
  price: string;
  images: string[];
  status: string | null;
  teamMemberIds: string[];
  slug: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string | null;
  website: string | null;
  image: string | null;
  status: string | null;
  order: number | null;
  workshopIds: string[];
}

export interface Impression {
  id: string;
  title: string;
  image: string | null;
  date: string | null;
  published: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  website: string | null;
  status: string | null;
  order: number | null;
}
