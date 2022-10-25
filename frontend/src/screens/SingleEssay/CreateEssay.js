import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEssayAction } from "../../actions/essayActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateEssay({ history }) {
    const [heading, setHeading] = useState("");
    const [essaybody, setEssaybody] = useState("");

    const dispatch = useDispatch();

    const essayCreate = useSelector((state) => state.essayCreate);
    const { loading, error, essay } = essayCreate;

    console.log(essay);

    const resetHandler = () => {
        setHeading("");
        setEssaybody("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createEssayAction(heading, essaybody));
        if (!heading || !essaybody) return;

        resetHandler();
        history.push("/myessays");
    };

    useEffect(() => {}, []);

    return (
        <MainScreen title="Create an Essay">
            <Card>
                <Card.Header>Create a new Essay</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="heading">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control
                                type="heading"
                                value={heading}
                                placeholder="Enter the heading"
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="essaybody">
                            <Form.Label>Essay Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={essaybody}
                                placeholder="Enter the essay body"
                                onChange={(e) => setEssaybody(e.target.value)}
                            />
                        </Form.Group>
                        {essaybody && (
                            <Card>
                                <Card.Header>Essay Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{essaybody}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary">
                            Create Essay
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger">
                            Reset
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creatd on: {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default CreateEssay;
                        