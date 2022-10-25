import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  essayCreateReducer,
  essayDeleteReducer,
  essayListReducer,
  essayUpdateReducer,
} from "./reducers/essayReducers";
import {
  contactCreateReducer,
  contactDeleteReducer,
  contactListReducer,
  contactUpdateReducer,
} from "./reducers/contactsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  todoCreateReducer,
  todoDeleteReducer,
  todoListReducer,
  todoUpdateReducer,
} from "./reducers/todosReducers";
import {
  questionCreateReducer,
  questionDeleteReducer,
  questionListReducer,
  questionUpdateReducer,
} from "./reducers/questionsReducers";

const reducer = combineReducers({
  noteList: noteListReducer,
  essayList: essayListReducer,
  contactList: contactListReducer,
  todoList: todoListReducer,
  questionList: questionListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  essayCreate: essayCreateReducer,
  todoCreate: todoCreateReducer,
  questionCreate: questionCreateReducer,
  contactCreate: contactCreateReducer,
  noteDelete: noteDeleteReducer,
  essayDelete: essayDeleteReducer,
  todoDelete: todoDeleteReducer,
  contactDelete: contactDeleteReducer,
  questionDelete: questionDeleteReducer,
  noteUpdate: noteUpdateReducer,
  essayUpdate: essayUpdateReducer,
  contactUpdate: contactUpdateReducer,
  userUpdate: userUpdateReducer,
  todoUpdate: todoUpdateReducer,
  questionUpdate: questionUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
