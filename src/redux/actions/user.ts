import { actionTypes } from "../actionTypes";

export const login = (payload: ILoginPayload) => ({
    type: actionTypes.LOGIN,
    payload,
});

export const logout = () => ({
    type: actionTypes.LOGOUT,
});

export const register = (payload: IRegisterPayload) => ({
    type: actionTypes.REGISTER,
    payload,
});

export interface ILoginPayload {
    username: string;
}

export interface IRegisterPayload {
    username: string;
}