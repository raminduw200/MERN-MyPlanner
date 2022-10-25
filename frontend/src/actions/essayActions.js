import {
    ESSAY_CREATE_FAIL,
    ESSAY_CREATE_REQUEST,
    ESSAY_CREATE_SUCCESS,
    ESSAY_DELETE_FAIL,
    ESSAY_DELETE_REQUEST,
    ESSAY_DELETE_SUCCESS,
    ESSAY_LIST_FAIL,
    ESSAY_LIST_REQUEST,
    ESSAY_LIST_SUCCESS,
    ESSAY_UPDATE_FAIL,
    ESSAY_UPDATE_REQUEST,
    ESSAY_UPDATE_SUCCESS,
} from "../constants/essayConstants";
import axios from "axios";

export const listEssays = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ESSAY_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

    const { data } = await axios.get(`/api/essays`, config);

    dispatch({
        type: ESSAY_LIST_SUCCESS,
        payload: data,
    });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ESSAY_LIST_FAIL,
            payload: message,
        });
    }
};

export const createEssayAction = (heading, essaybody) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: ESSAY_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/essays/create`,
            { heading, essaybody },
            config
        );

        dispatch({
            type: ESSAY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ESSAY_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deleteEssayAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ESSAY_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/essays/${id}`, config);

        dispatch({
            type: ESSAY_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ESSAY_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updateEssayAction = (id, heading, essaybody) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: ESSAY_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/essays/${id}`,
            { heading, essaybody },
            config
        );

        dispatch({
            type: ESSAY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ESSAY_UPDATE_FAIL,
            payload: message,
        });
    }
}

