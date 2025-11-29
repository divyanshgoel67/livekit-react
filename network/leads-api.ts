import { apiClient, isAxiosError } from './client';

// API response structure
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

// API endpoint URL
const LEADS_API_URL = 'https://qe44e6tev4ewkksjfddr2xgdry0yanyo.lambda-url.ap-south-1.on.aws/';

// Constant values for fields not in API
const DEFAULT_COMPANY = 'TechCorp';
const DEFAULT_DEAL_VALUE = '$2.5M';
const DEFAULT_TAGS = ['Decision Maker'];

export interface GetLeadsParams {
  endpoint?: string;
  type?: 'recommended' | 'favorites';
  difficulty?: string[];
  source?: string[];
  minDealValue?: string;
  maxDealValue?: string;
  personas?: string[];
}

/**
 * Transforms API response to Lead with constant fields
 */
function transformApiResponseToLead(apiLead: LeadApiResponse): Lead {
  return {
    ...apiLead,
    avatar: apiLead.avatar_url,
    role: apiLead.tag, // Use tag as role, or you can format it differently
    company: DEFAULT_COMPANY,
    dealValue: DEFAULT_DEAL_VALUE,
    tags: DEFAULT_TAGS,
  };
}

// Mock data matching API structure
const mockApiLeads: LeadApiResponse[] = [
  { id: '1', name: 'Sarah Jenkins', tag: 'The Strategist', difficulty: 3, source: 'LinkedIn', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces' },
  { id: 'b34eca68-0f2f-4023-a669-0f5aabb14379', name: 'David Ross', tag: 'The Commander', difficulty: 2, source: 'Referral', avatar_url: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png' },
  { id: '3', name: 'Amanda Low', tag: 'The Analyst', difficulty: 2, source: 'Inbound', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces' },
  { id: '4', name: 'Vikram Malhotra', tag: 'The Visionary', difficulty: 5, source: 'Conference', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces' },
  { id: '5', name: 'Priya Patel', tag: 'The Innovator', difficulty: 3, source: 'Cold Email', avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces' },
  { id: '6', name: 'James Wilson', tag: 'The Collaborator', difficulty: 1, source: 'Website', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces' },
  { id: '7', name: 'Elena Rodriguez', tag: 'The Executor', difficulty: 4, source: 'LinkedIn', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces' },
  { id: '8', name: 'Michael Chang', tag: 'The Negotiator', difficulty: 2, source: 'Referral', avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces' },
  { id: '9', name: 'Lisa Thompson', tag: 'The Leader', difficulty: 5, source: 'Conference', avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces' },
  { id: '10', name: 'Robert Foster', tag: 'The Closer', difficulty: 3, source: 'Cold Email', avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces' },
  { id: '11', name: 'Sophie Anderson', tag: 'The Connector', difficulty: 2, source: 'Inbound', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces' },
  { id: '12', name: 'Daniel Kim', tag: 'The Problem Solver', difficulty: 1, source: 'Website', avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces' },
  { id: '13', name: 'Emma Watson', tag: 'The Architect', difficulty: 4, source: 'LinkedIn', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces' },
  { id: '14', name: 'Marcus Johnson', tag: 'The Decision Maker', difficulty: 5, source: 'Conference', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces' },
  { id: '15', name: 'Olivia Brown', tag: 'The Facilitator', difficulty: 2, source: 'Inbound', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces' },
];

// Transform mock API data to Lead format
const mockAllLeads: Lead[] = mockApiLeads.map(transformApiResponseToLead);

// Recommended leads (first 6)
const mockRecommendedLeads: Lead[] = mockAllLeads.slice(0, 6);

// Favorite leads (last 6)
const mockFavoriteLeads: Lead[] = mockAllLeads.slice(6, 12);

/**
 * Filters mock leads based on query parameters
 */
function filterMockLeads(leads: Lead[], params: GetLeadsParams): Lead[] {
  let filtered = [...leads];

  // Filter by difficulty
  if (params.difficulty && params.difficulty.length > 0) {
    const difficultyMap: Record<number, string> = { 
      1: 'Easy', 
      2: 'Easy', 
      3: 'Medium', 
      4: 'Hard', 
      5: 'Extreme' 
    };
    filtered = filtered.filter(lead => {
      const leadDifficulty = difficultyMap[lead.difficulty];
      return params.difficulty!.includes(leadDifficulty);
    });
  }

  // Filter by source
  if (params.source && params.source.length > 0) {
    filtered = filtered.filter(lead => 
      params.source!.some(s => lead.source.includes(s) || (s === 'Conference' && lead.source === 'Conference'))
    );
  }

  // Filter by deal value range
  if (params.minDealValue || params.maxDealValue) {
    filtered = filtered.filter(lead => {
      const value = parseInt(lead.dealValue.replace(/[^0-9]/g, ''));
      const min = params.minDealValue ? parseInt(params.minDealValue) : 0;
      const max = params.maxDealValue ? parseInt(params.maxDealValue) : Infinity;
      return value >= min && value <= max;
    });
  }

  // Filter by personas/tags
  if (params.personas && params.personas.length > 0) {
    filtered = filtered.filter(lead => 
      lead.tags && params.personas!.some(p => lead.tags!.includes(p))
    );
  }

  return filtered;
}

/**
 * Fetches leads from the leads endpoint
 */
export async function getLeads(params: GetLeadsParams = {}): Promise<Lead[]> {
  const { endpoint = LEADS_API_URL, type, difficulty, source, minDealValue, maxDealValue, personas } = params;

  try {
    const queryParams = new URLSearchParams();
    
    if (type) {
      queryParams.append('type', type);
    }
    if (difficulty && difficulty.length > 0) {
      difficulty.forEach(d => queryParams.append('difficulty', d));
    }
    if (source && source.length > 0) {
      source.forEach(s => queryParams.append('source', s));
    }
    if (minDealValue) {
      queryParams.append('minDealValue', minDealValue);
    }
    if (maxDealValue) {
      queryParams.append('maxDealValue', maxDealValue);
    }
    if (personas && personas.length > 0) {
      personas.forEach(p => queryParams.append('personas', p));
    }

    // Use the endpoint directly (API doesn't seem to support query params based on the response)
    const url = endpoint;
    const response = await apiClient.get<LeadApiResponse[]>(url);

    // Transform API response to Lead format with constant fields
    let leads = response.data.map(transformApiResponseToLead);
    
    // Apply client-side filtering if needed (since API might not support query params)
    if (type || difficulty || source || minDealValue || maxDealValue || personas) {
      leads = filterMockLeads(leads, params);
    }
    
    return leads;
  } catch (error) {
    // Fallback to mock data when API is not available
    console.warn('API call failed, using mock data:', error);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let mockData: Lead[] = [];
    
    // Select appropriate mock dataset based on type
    if (type === 'recommended') {
      mockData = mockRecommendedLeads;
    } else if (type === 'favorites') {
      mockData = mockFavoriteLeads;
    } else {
      mockData = mockAllLeads;
    }
    
    // Apply filters to mock data
    return filterMockLeads(mockData, params);
  }
}

/**
 * Fetches recommended leads
 */
export async function getRecommendedLeads(endpoint?: string): Promise<Lead[]> {
  try {
    const leads = await getLeads({ endpoint: endpoint || LEADS_API_URL, type: 'recommended' });
    // If API doesn't filter by type, return first 6 as recommended
    return leads.slice(0, 6);
  } catch (error) {
    // Fallback to mock data with delay
    console.warn('Using mock recommended leads');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRecommendedLeads;
  }
}

/**
 * Fetches favorite leads
 */
export async function getFavoriteLeads(endpoint?: string): Promise<Lead[]> {
  try {
    const leads = await getLeads({ endpoint: endpoint || LEADS_API_URL, type: 'favorites' });
    // If API doesn't filter by type, return last 6 as favorites
    return leads.slice(-6);
  } catch (error) {
    // Fallback to mock data with delay
    console.warn('Using mock favorite leads');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFavoriteLeads;
  }
}

