import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAction, listTodos } from "../../actions/todosActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyTodos({ history, search }) {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todoList);
  const { loading, error, todos } = todoList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const todoDelete = useSelector((state) => state.todoDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = todoDelete;

  const todoCreate = useSelector((state) => state.todoCreate);
  const { success: successCreate } = todoCreate;

  const todoUpdate = useSelector((state) => state.todoUpdate);
  const { success: successUpdate } = todoUpdate;

  useEffect(() => {
    dispatch(listTodos());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodoAction(id));
    }
  };

  return (
    <MainScreen title={`My ToDos`}>
      {console.log(todos)}
      <Link to="/createtodo">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create To Do List
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {todos &&
        todos
          .filter((filteredTodo) =>
            filteredTodo.Heading.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((todo) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={todo._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(todo)}
                    style={{
                      color: "blue",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {todo.Heading}
                    </Accordion.Toggle>
                  </span>

                  <div>

                    {/* Done */}

                    {/* <Button
                      variant="success"
                      className="mx-2"                      
                      // call the function strikeThrough when onClick the Done button and strike through the card title
                      // onClick={strikeThrough}
                      >Done</Button> */}

                    <Button href={`/todo/${todo._id}`}>Edit</Button>
                    <Button
                      variant="success"
                      className="mx-2"
                      onClick={() => deleteHandler(todo._id)}
                    >
                      Done
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                      Priority Levels - {todo.PriorityLevel}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{todo.Description}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {todo.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyTodos;
