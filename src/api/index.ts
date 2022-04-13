import axios from 'axios'

const API_TOKEN = 'hLrAlbgOrV1ViijiASR1u7Ce1US1e75AHpa58g76';

export type IFetchNewsParams = {
    _limit?: number;
}
export type IFetchNewsResponse = INewsData[];
export interface INewsData {
    id: number,
    title: string,
    url: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt: string
}
// export interface INewsData {
//     id: string;
//     title: string;
//     description: string;
//     url: string;
//     author: string;
//     image: string;
//     language: string;
//     category: string[];
//     published: string;
// }


export interface Meta {
    found: number;
    returned: number;
    limit: number;
    page: number;
}

export const fetchNews = async (params: IFetchNewsParams): Promise<IFetchNewsResponse> => {
    try {
        const res = await axios.get('https://api.spaceflightnewsapi.net/v3/reports', {
            params: {
                ...params,
            }
        })
        return res.data;
    } catch (e) {
        throw Error('FetchError')
    }
};