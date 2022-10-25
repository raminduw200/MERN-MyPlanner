import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteQuestionAction, listQuestions } from "../../actions/questionsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyQuestions({ history, search }) {
  const dispatch = useDispatch();

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  // const filteredQuestions = questions.filter((question) =>
  //   question.que.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionDelete = useSelector((state) => state.questionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = questionDelete;

  const questionCreate = useSelector((state) => state.questionCreate);
  const { success: successCreate } = questionCreate;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const { success: successUpdate } = questionUpdate;

  useEffect(() => {
    dispatch(listQuestions());
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
      dispatch(deleteQuestionAction(id));
    }
  };

  return (
    <MainScreen title={`Question Bank`}>
      {console.log(questions)}
      <Link to="/createquestion">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Question
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {questions &&
        questions
          .filter((filteredQuestion) =>
            filteredQuestion.que.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((question) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={question._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(question)}
                    style={{
                      color: "black",
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
                      {question.que}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/question/${question._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(question._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        subject - {question.subject}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{question.answer}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {question.createdAt.substring(0, 10)}
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

export default MyQuestions;
