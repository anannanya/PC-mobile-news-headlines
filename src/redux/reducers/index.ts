import { addStarMultiply } from './../actions/star';
import { initialValues, IStore, IUser, INewsDataMap, IStarredNewsIds } from "..";
import { addStar, removeStar } from "../actions/star"
import { actionTypes } from "../actionTypes";
import { ILoginPayload, login, logout, register } from '../actions/user'
import { storage } from "../../common/storage";
import { INewsData } from '../../api';

const starredNewsIds = (state: IStarredNewsIds = [], action: any) => {
    switch (action.type) {
        case actionTypes.ADD_STAR:
            return [...state, action.payload.id];
        case actionTypes.REMOVE_STAR:
            return state.filter(id => id !== action.payload.id);
        case actionTypes.ADD_STAR_MULTIPLY:
            return [...state, ...action.payload.ids];
        case actionTypes.LOGOUT:
            return [];
        default:
            return state;
    }
}

const user = (state: IUser, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            const { payload: loginPayload } = action as ReturnType<typeof login>;
            return {
                name: loginPayload.username,
            };
        case actionTypes.LOGOUT:
            return null;
        case actionTypes.REGISTER:
            const { payload: registerPayload } = action as ReturnType<typeof register>;
            return {
                name: registerPayload.username,
            }
        default:
            return state;
    }
}

const news = (state: INewsDataMap, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_NEWS:
            const { payload = [] } = action;
            const updateData: INewsDataMap = {};
            payload.forEach((meta: INewsData) => {
                updateData[meta.id] = meta;
            })
            return {
                ...state,
                ...updateData
            };
        default:
            return state;
    }
}

export const rootReducer = (state: IStore = initialValues, action: any) => {
    return {
        starredNewsIds: starredNewsIds(state.starredNewsIds, action),
        user: user(state.user, action),
        news: news(state.news, action),
    }
}