import {
  TODOS_CREATE_FAIL,
  TODOS_CREATE_REQUEST,
  TODOS_CREATE_SUCCESS,
  TODOS_DELETE_FAIL,
  TODOS_DELETE_REQUEST,
  TODOS_DELETE_SUCCESS,
  TODOS_LIST_FAIL,
  TODOS_LIST_REQUEST,
  TODOS_LIST_SUCCESS,
  TODOS_UPDATE_FAIL,
  TODOS_UPDATE_REQUEST,
  TODOS_UPDATE_SUCCESS,
} from "../constants/todosConstants";
import axios from "axios";

export const listTodos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODOS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/todos`, config);

    dispatch({
      type: TODOS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createTodoAction = (Heading, Description, PriorityLevel) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TODOS_CREATE_REQUEST,
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
      `/api/todos/create`,
      { Heading, Description, PriorityLevel },
      config
    );

    dispatch({
      type: TODOS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteTodoAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODOS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/todos/${id}`, config);

    dispatch({
      type: TODOS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateTodoAction = (id, Heading, Description, PriorityLevel) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TODOS_UPDATE_REQUEST,
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
      `/api/todos/${id}`,
      { Heading, Description, PriorityLevel },
      config
    );

    dispatch({
      type: TODOS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_UPDATE_FAIL,
      payload: message,
    });
  }
};


