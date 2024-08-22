import { configAxios } from '@/utils/api/api-instance';
import { priceQuotesURL } from '@/utils/api/end-points';
import { ENDPOINTS } from '@/utils/api/api-urls';

export interface IPriceQuotesDaily {
    code?: string;
    codein?: string;
    name?: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    createDate: string;
}
export const getPriceQuotesUSDBRL = async (days: number | string = '15'): Promise<IPriceQuotesDaily[]> => {
    const api = configAxios(priceQuotesURL);
    const { data } = await api.get<IPriceQuotesDaily[]>(`${ENDPOINTS.JSON}/${ENDPOINTS.DAILY}/USD-BRL/${days}`);
    return data;
};

// https://economia.awesomeapi.com.br/json/daily/USD-BRL/15
