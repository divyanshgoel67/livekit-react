export interface LeadApiResponse {
  id: string;
  name: string;
  tag: string;
  difficulty: number;
  source: string;
  avatar_url: string;
}

// Extended Lead interface with constant fields for rendering
export interface Lead extends LeadApiResponse {
  role: string; // Derived from tag or constant
  company: string; // Constant value
  dealValue: string; // Constant value
  avatar: string; // Mapped from avatar_url
  tags?: string[]; // Constant value
}

export interface GetLeadsParams {
  endpoint?: string;
  type?: 'recommended' | 'favorites';
  difficulty?: string[];
  source?: string[];
  minDealValue?: string;
  maxDealValue?: string;
  personas?: string[];
}
