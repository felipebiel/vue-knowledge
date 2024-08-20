import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { gitHubBaseURL } from '@/utils/api/end-points';

export const headerAxios = () => {
    // if use tokens on Headers
    const token = '';
    let config = {};
    if (token) {
        config = {
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
};

export const configAxiosGithub = () =>
    applyCaseMiddleware(
        axios.create({
            headers: headerAxios(),
            baseURL: gitHubBaseURL,
        }),
    );

export const configAxiosGithubWithoutConverter = () =>
    axios.create({
        headers: headerAxios(),
        baseURL: gitHubBaseURL,
    });
