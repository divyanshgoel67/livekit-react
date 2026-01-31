import { apiClient, isAxiosError } from './client';
import { GetLeadsParams, Lead, LeadApiResponse } from './models/agent';

const baseEndpoint = '/core/agents';

const DEFAULT_COMPANY = 'TechCorp';
const DEFAULT_DEAL_VALUE = '$2.5M';
const DEFAULT_TAGS = ['Decision Maker'];

function transformApiResponseToLead(apiLead: LeadApiResponse): Lead {
  return {
    ...apiLead,
    avatar: apiLead.avatar_url,
    role: apiLead.tag,
    company: DEFAULT_COMPANY,
    dealValue: DEFAULT_DEAL_VALUE,
    tags: DEFAULT_TAGS,
  };
}

export async function getLeads(params: GetLeadsParams = {}): Promise<Lead[] | undefined> {
  const endpoint = baseEndpoint;
  try {
    const response = await apiClient.get<LeadApiResponse[]>(endpoint, { params });
    return response.data.map(transformApiResponseToLead);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        `ERROR: fetching leads with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      console.error('ERROR:', error);
    }
    return undefined;
  }
}

export async function getRecommendedLeads(): Promise<Lead[] | undefined> {
  const leads = await getLeads();
  return leads?.slice(0, 6);
}

export async function getFavoriteLeads(): Promise<Lead[] | undefined> {
  const leads = await getLeads();
  return leads?.slice(6, 12);
}
