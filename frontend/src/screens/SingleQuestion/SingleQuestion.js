import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestionAction, updateQuestionAction } from "../../actions/questionsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleQuestion({ match, history }) {
  const [que, setque] = useState();
  const [answer, setanswer] = useState();
  const [subject, setsubject] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const { loading, error } = questionUpdate;

  const questionDelete = useSelector((state) => state.questionDelete);
  const { loading: loadingDelete, error: errorDelete } = questionDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteQuestionAction(id));
    }
    history.push("/myquestions");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/questions/${match.params.id}`);

      setque(data.que);
      setanswer(data.answer);
      setsubject(data.subject);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setque("");
    setsubject("");
    setanswer("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateQuestionAction(match.params.id, que, answer, subject));
    if (!que || !answer || !subject) return;

    resetHandler();
    history.push("/myquestions");
  };

  return (
    <MainScreen que="Edit Question">
      <Card>
        <Card.Header>Edit your Question</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="que">
              <Form.Label>que</Form.Label>
              <Form.Control
                type="que"
                placeholder="Enter the que"
                value={que}
                onChange={(e) => setque(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="answer">
              <Form.Label>answer</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the answer"
                rows={4}
                value={answer}
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
              <Form.Label>subject</Form.Label>
              <Form.Control
                type="answer"
                placeholder="Enter the subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Question
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Question
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleQuestion;
