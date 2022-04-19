import axios from 'axios'
import { storage } from '../common/storage';

const API_TOKEN = 'hLrAlbgOrV1ViijiASR1u7Ce1US1e75AHpa58g76';

export type IFetchNewsParams = {
    _limit?: number;
    _start?: number;
}
export type IFetchNewsResponse = INewsData[];
export interface INewsData {
    id: number,
    title: string,
    url: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt: string,
}

// export interface Meta {
//     found: number;
//     returned: number;
//     limit: number;
//     page: number;
// }

export const fetchNews = async (params: IFetchNewsParams): Promise<IFetchNewsResponse> => {
    try {
        const res = await axios.get('https://api.spaceflightnewsapi.net/v3/reports', {
            params: {
                ...params,
            }
        });
        // 最多缓存 50 条数据
        const cacheNews = [...res.data, ...(storage.get("news") || [])].slice(0, 50);
        storage.set('news', cacheNews);
        return res.data;
    } catch (e) {
        const cache = storage.get('news');
        if (cache) {
            return cache.slice(0, params._limit);
        } else {
            throw Error('FetchError')
        }
    }
};