import { configAxiosWithoutConverter } from '@/utils/api/api-instance';
import { gitHubBaseURL } from '@/utils/api/end-points';
import { ENDPOINTS } from '@/utils/api/api-urls';

export const getRepositoryLanguages = async (owner: string = 'felipebiel', repo: string = 'vue-knowledge'): Promise<any> => {
    const api = configAxiosWithoutConverter(gitHubBaseURL);
    const { data } = await api.get(`${ENDPOINTS.REPO}/${owner}/${repo}/${ENDPOINTS.LANGUAGE}`);
    return data;
};
