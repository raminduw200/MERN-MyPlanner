import React, { useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteEssayAction, listEssays } from "../../actions/essayActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyEssays({ history, search }) {
    const dispatch = useDispatch();

    const essayList = useSelector((state) => state.essayList);
    const { loading, error, essays } = essayList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const essayDelete = useSelector((state) => state.essayDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = essayDelete;

    const essayCreate = useSelector((state) => state.essayCreate);
    const { success: successCreate } = essayCreate;

    const essayUpdate = useSelector((state) => state.essayUpdate);
    const { success: successUpdate } = essayUpdate;

    useEffect(() => {
        dispatch(listEssays());
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
            dispatch(deleteEssayAction(id));
        }
    };

    return (
        <MainScreen title={`My Essays`}>
            {console.log(essays)}
            <Link to="/createessay">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Essay
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loading && <Loading />}
            {loadingDelete && <Loading />}
            {essays &&
                essays
                    .filter((filterdEssay) =>
                        filterdEssay.heading.toLowerCase().includes(search.toLowerCase())
                    )
                    .reverse()
                    .map((essay) => (
                        <Accordion>
                            <Card style={{ margin: 10 }} key={essay._id}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span 
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
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
                                            {essay.heading}
                                        </Accordion.Toggle>
                                    </span>

                                    <div>
                                        <Button href={`/essay/${essay._id}`}>Edit</Button>
                                        <Button
                                            variant="danger"
                                            className="mx-2"
                                            onClick={() => deleteHandler(essay._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                            <ReactMarkdown>{essay.essaybody}</ReactMarkdown>
                                            <footer className="blockquote-footer">
                                                Created on{" "}
                                                <cite title="Source Title">
                                                    {essay.createdAt.substring(0, 10)}
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

export default MyEssays;
