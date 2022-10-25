import {
  TODOS_UPDATE_REQUEST,
  TODOS_UPDATE_SUCCESS,
  TODOS_UPDATE_FAIL,
  TODOS_CREATE_FAIL,
  TODOS_CREATE_REQUEST,
  TODOS_CREATE_SUCCESS,
  TODOS_DELETE_FAIL,
  TODOS_DELETE_REQUEST,
  TODOS_DELETE_SUCCESS,
  TODOS_LIST_FAIL,
  TODOS_LIST_REQUEST,
  TODOS_LIST_SUCCESS,
} from "../constants/todosConstants";

export const todoListReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case TODOS_LIST_REQUEST:
      return { loading: true };
    case TODOS_LIST_SUCCESS:
      return { loading: false, todos: action.payload };
    case TODOS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const todoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TODOS_CREATE_REQUEST:
      return { loading: true };
    case TODOS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TODOS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const todoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODOS_DELETE_REQUEST:
      return { loading: true };
    case TODOS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TODOS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const todoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TODOS_UPDATE_REQUEST:
      return { loading: true };
    case TODOS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TODOS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
