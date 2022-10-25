import {
    ESSAY_LIST_REQUEST,
    ESSAY_LIST_SUCCESS,
    ESSAY_LIST_FAIL,
    ESSAY_CREATE_REQUEST,
    ESSAY_CREATE_SUCCESS,
    ESSAY_CREATE_FAIL,
    ESSAY_UPDATE_REQUEST,
    ESSAY_UPDATE_SUCCESS,
    ESSAY_UPDATE_FAIL,
    ESSAY_DELETE_REQUEST,
    ESSAY_DELETE_SUCCESS,
    ESSAY_DELETE_FAIL,
} from "../constants/essayConstants";

export const essayListReducer = (state = { essays: [] }, action) => {
    switch (action.type) {
        case ESSAY_LIST_REQUEST:
            return { loading: true };
        case ESSAY_LIST_SUCCESS:
            return { loading: false, essays: action.payload };
        case ESSAY_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const essayCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ESSAY_CREATE_REQUEST:
            return { loading: true };
        case ESSAY_CREATE_SUCCESS:
            return { loading: false, success: true };
        case ESSAY_CREATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const essayDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ESSAY_DELETE_REQUEST:
            return { loading: true };
        case ESSAY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ESSAY_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
};

export const essayUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ESSAY_UPDATE_REQUEST:
            return { loading: true };
        case ESSAY_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case ESSAY_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
};
