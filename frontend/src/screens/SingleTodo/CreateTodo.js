import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAction } from "../../actions/todosActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateTodo({ history }) {
  const [heading, setTodoHeading] = useState("");
  const [description, setDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");

  const dispatch = useDispatch();

  const todoCreate = useSelector((state) => state.todoCreate);
  const { loading, error, todo } = todoCreate;

  console.log(todo);

  const resetHandler = () => {
    setTodoHeading("");
    setPriorityLevel("");
    setDescription("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTodoAction(heading, description, priorityLevel));
    if (!heading || !description || !priorityLevel) return;

    resetHandler();
    history.push("/mytodos");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Todo">
      <Card>
        <Card.Header>Create a New Task</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="heading">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="heading"
                value={heading}
                placeholder="Enter the heading"
                onChange={(e) => setTodoHeading(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Todo</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Enter the description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {description && (
              <Card>
                <Card.Header>Todo Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="priorityLevel">
              <Form.Label>Priority Level</Form.Label>
              <Form.Control
                type="priorityLevel"
                value={priorityLevel}
                placeholder="Enter the Priority Level"
                onChange={(e) => setPriorityLevel(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Todo
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateTodo;
