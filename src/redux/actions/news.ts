import { INewsData } from "../../api";
import { actionTypes } from "../actionTypes";

export const addNews = (payload: INewsData[]) => ({
    type: actionTypes.ADD_NEWS,
    payload
});