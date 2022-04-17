import { actionTypes } from "../actionTypes";

export interface IStarPayload {
    id: number;
}

export interface IStarMultiplyPayload {
    ids: number[];
}

export const addStar = (payload: IStarPayload) => ({
    type: actionTypes.ADD_STAR,
    payload,
});

export const addStarMultiply = (payload: IStarMultiplyPayload) => ({
    type: actionTypes.ADD_STAR_MULTIPLY,
    payload,
});

export const removeStar = (payload: IStarPayload) => ({
    type: actionTypes.REMOVE_STAR,
    payload,
});

