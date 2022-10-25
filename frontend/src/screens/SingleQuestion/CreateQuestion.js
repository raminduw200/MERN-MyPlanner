import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionAction } from "../../actions/questionsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateQuestion({ history }) {
  const [que, setque] = useState("");
  const [answer, setanswer] = useState("");
  const [subject, setsubject] = useState("");

  const dispatch = useDispatch();

  const questionCreate = useSelector((state) => state.questionCreate);
  const { loading, error, question } = questionCreate;

  console.log(question);

  const resetHandler = () => {
    setque("");
    setsubject("");
    setanswer("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createQuestionAction(que, answer, subject));
    if (!que || !answer || !subject) return;

    resetHandler();
    history.push("/myquestions");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen que="Create a Question">
      <Card>
        <Card.Header>Create a new Question</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="que">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="que"
                value={que}
                placeholder="Enter the question"
                onChange={(e) => setque(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as="textarea"
                value={answer}
                placeholder="Enter the answer"
                rows={4}
                onChange={(e) => setanswer(e.target.value)}
              />
            </Form.Group>
            {answer && (
              <Card>
                <Card.Header>Question Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{answer}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="answer">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="answer"
                value={subject}
                placeholder="Enter the subject"
                onChange={(e) => setsubject(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Question
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Question
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

export default CreateQuestion;
