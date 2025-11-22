// Placeholder avatars - you can replace these with actual images
export const placeholderAvatar1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';
export const placeholderAvatar2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop';
export const placeholderAvatar3 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop';

export interface Persona {
  id: number;
  name: string;
  tag: string;
  difficulty: number;
  source: string;
  avatar: string;
  isFavorite: boolean;
}

export interface RecentAttempt {
  id: number;
  date: string;
  persona: string;
  outcome: string;
  score: number;
  avatar: string;
}

export const lastPlayedPersonas: Persona[] = [
  {
    id: 1,
    name: 'Mr. Sharma',
    tag: 'The Investor',
    difficulty: 4,
    source: 'Referral',
    avatar: placeholderAvatar2,
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Rahul & Priya',
    tag: 'First-Time Buyers',
    difficulty: 2,
    source: 'FB Ad',
    avatar: placeholderAvatar1,
    isFavorite: false,
  },
];

export const favoritePersonas: Persona[] = [
  {
    id: 3,
    name: 'Ms. Khan',
    tag: 'Window Shopper',
    difficulty: 3,
    source: 'Website',
    avatar: placeholderAvatar3,
    isFavorite: true,
  },
  {
    id: 1,
    name: 'Mr. Sharma',
    tag: 'The Investor',
    difficulty: 4,
    source: 'Referral',
    avatar: placeholderAvatar2,
    isFavorite: true,
  },
];

export const easyPersonas: Persona[] = [
  {
    id: 2,
    name: 'Rahul & Priya',
    tag: 'First-Time Buyers',
    difficulty: 2,
    source: 'FB Ad',
    avatar: placeholderAvatar1,
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Young Couple',
    tag: 'Dream Home Seekers',
    difficulty: 1,
    source: 'Website',
    avatar: placeholderAvatar1,
    isFavorite: false,
  },
];

export const hardPersonas: Persona[] = [
  {
    id: 1,
    name: 'Mr. Sharma',
    tag: 'The Investor',
    difficulty: 4,
    source: 'Referral',
    avatar: placeholderAvatar2,
    isFavorite: true,
  },
  {
    id: 5,
    name: 'The Skeptic',
    tag: 'Experienced Buyer',
    difficulty: 5,
    source: 'Cold Call',
    avatar: placeholderAvatar3,
    isFavorite: false,
  },
];

export const recentHistory: RecentAttempt[] = [
  {
    id: 1,
    date: 'Today, 10:30 AM',
    persona: 'Mr. Sharma',
    outcome: 'Meeting Booked',
    score: 92,
    avatar: placeholderAvatar2,
  },
  {
    id: 2,
    date: 'Today, 9:00 AM',
    persona: 'Rahul & Priya',
    outcome: 'Hung Up',
    score: 45,
    avatar: placeholderAvatar1,
  },
  {
    id: 3,
    date: 'Yesterday',
    persona: 'Ms. Khan',
    outcome: 'Follow-up Required',
    score: 78,
    avatar: placeholderAvatar3,
  },
];

