import {
  QUESTIONS_UPDATE_REQUEST,
  QUESTIONS_UPDATE_SUCCESS,
  QUESTIONS_UPDATE_FAIL,
  QUESTIONS_CREATE_FAIL,
  QUESTIONS_CREATE_REQUEST,
  QUESTIONS_CREATE_SUCCESS,
  QUESTIONS_DELETE_FAIL,
  QUESTIONS_DELETE_REQUEST,
  QUESTIONS_DELETE_SUCCESS,
  QUESTIONS_LIST_FAIL,
  QUESTIONS_LIST_REQUEST,
  QUESTIONS_LIST_SUCCESS,
} from "../constants/questionsConstants";

export const questionListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTIONS_LIST_REQUEST:
      return { loading: true };
    case QUESTIONS_LIST_SUCCESS:
      return { loading: false, questions: action.payload };
    case QUESTIONS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTIONS_CREATE_REQUEST:
      return { loading: true };
    case QUESTIONS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case QUESTIONS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const questionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTIONS_DELETE_REQUEST:
      return { loading: true };
    case QUESTIONS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTIONS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const questionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTIONS_UPDATE_REQUEST:
      return { loading: true };
    case QUESTIONS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case QUESTIONS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
