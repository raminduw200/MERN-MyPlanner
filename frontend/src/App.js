import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import MyEssays from "./screens/MyEssays/MyEssays";
import MyContacts from "./screens/MyContacts/MyContacts";
import MyTodos from "./screens/MyTodos/MyTodos";
import MyQuestions from "./screens/MyQuestions/MyQuestions";
import SingleQuestion from "./screens/SingleQuestion/SingleQuestion";
import SingleNote from "./screens/SingleNote/SingleNote";
import SingleEssay from "./screens/SingleEssay/SingleEssay";
import SingleContact from "./screens/SingleContact/SingleContact";
import SingleTodo from "./screens/SingleTodo/SingleTodo";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import CreateEssay from "./screens/SingleEssay/CreateEssay";
import CreateContact from "./screens/SingleContact/CreateContact";
import CreateTodo from "./screens/SingleTodo/CreateTodo";
import CreateQuestion from "./screens/SingleQuestion/CreateQuestion";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/mynotes"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route
          path="/myessays"
          component={({ history }) => (
            <MyEssays search={search} history={history} />
          )}
        />
        <Route
          path="/mycontacts"
          component={({ history }) => (
            <MyContacts search={search} history={history} />
          )}
        />
        <Route
          path="/mytodos"
          component={({ history }) => (
            <MyTodos search={search} history={history} />
          )}
        />
        <Route
          path="/myquestions"
          component={({ history }) => (
            <MyQuestions search={search} history={history} />
          )}
        />
        <Route path="/question/:id" component={SingleQuestion} />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/essay/:id" component={SingleEssay} />
        <Route path="/contact/:id" component={SingleContact} />
        <Route path="/todo/:id" component={SingleTodo} />
        <Route path="/createtodo" component={CreateTodo} />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/createessay" component={CreateEssay} />
        <Route path="/createcontact" component={CreateContact} />
        <Route path="/createquestion" component={CreateQuestion} />
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
