import { createStore } from 'redux'
import { INewsData } from '../api';
import { rootReducer } from './reducers';

export type IStarredNewsIds = number[];
export type IUser = {
    name: string;
} | null;

export type IStore = {
    starredNewsIds: IStarredNewsIds;
    user: IUser;
    news: INewsDataMap;
};

export type INewsDataMap = {
    [id: string]: INewsData;
}

export const initialValues = {
    starredNewsIds: [],
    user: null,
    news: {},
}

export const store = createStore(rootReducer);

(window as any).store = store;