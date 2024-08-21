import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export const headerAxios = (): AxiosHeaders => {
    // if use tokens on Headers
    const token = '';
    let config = new AxiosHeaders();
    if (token) {
        config.set('Authorization', `Bearer ${token}`);
    }

    return config;
};

export const configAxios = (baseURL: string): AxiosInstance =>
    applyCaseMiddleware(
        axios.create({
            headers: headerAxios(),
            baseURL: baseURL,
        }),
    );

export const configAxiosWithoutConverter = (baseURL: string): AxiosInstance =>
    axios.create({
        headers: headerAxios(),
        baseURL: baseURL,
    });
