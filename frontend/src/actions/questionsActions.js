import {
  QUESTIONS_CREATE_FAIL,
  QUESTIONS_CREATE_REQUEST,
  QUESTIONS_CREATE_SUCCESS,
  QUESTIONS_DELETE_FAIL,
  QUESTIONS_DELETE_REQUEST,
  QUESTIONS_DELETE_SUCCESS,
  QUESTIONS_LIST_FAIL,
  QUESTIONS_LIST_REQUEST,
  QUESTIONS_LIST_SUCCESS,
  QUESTIONS_UPDATE_FAIL,
  QUESTIONS_UPDATE_REQUEST,
  QUESTIONS_UPDATE_SUCCESS,
} from "../constants/questionsConstants";
import axios from "axios";

export const listQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTIONS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/questions`, config);

    dispatch({
      type: QUESTIONS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: QUESTIONS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createQuestionAction = (que, answer, subject) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUESTIONS_CREATE_REQUEST,
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
      `/api/questions/create`,
      { que, answer, subject },
      config
    );

    dispatch({
      type: QUESTIONS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: QUESTIONS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteQuestionAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTIONS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/questions/${id}`, config);

    dispatch({
      type: QUESTIONS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: QUESTIONS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateQuestionAction = (id, que, answer, subject) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUESTIONS_UPDATE_REQUEST,
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
      `/api/questions/${id}`,
      { que, answer, subject},
      config
    );

    dispatch({
      type: QUESTIONS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: QUESTIONS_UPDATE_FAIL,
      payload: message,
    });
  }
};
