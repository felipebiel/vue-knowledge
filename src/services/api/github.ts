import { configAxiosGithub } from '@/utils/api/api-instance';

import { ENDPOINTS } from '@/utils/api/api-urls';

export const getRepositoryLanguages = async (username = 'felipebiel', repo = 'vue-knowledge') => {
    const api = configAxiosGithub();
    const { data } = await api.get(`${ENDPOINTS.REPO}/${username}/${repo}/${ENDPOINTS.LANGUAGE}`);
    return data;
};
