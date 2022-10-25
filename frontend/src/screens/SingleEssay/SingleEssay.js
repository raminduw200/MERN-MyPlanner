import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEssayAction, updateEssayAction } from "../../actions/essayActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleEssay({ match, history }) {
    const [heading, setHeading] = useState();
    const [essaybody, setEssaybody] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const essayUpdate = useSelector((state) => state.essayUpdate);
    const { loading, error } = essayUpdate;

    const essayDelete = useSelector((state) => state.essayDelete);
    const { loading: loadingDelete, error: errorDelete } = essayDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteEssayAction(id));
        }
        history.push("/myessays");
    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/essays/${match.params.id}`);
            
            setHeading(data.heading);
            setEssaybody(data.essaybody);
            setDate(data.updatedAt);
        };
        
        fetching();
    }, [match.params.id, date]);
        
    const resetHandler = () => {
        setHeading("");
        setEssaybody("");
    }

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateEssayAction(match.params.id, heading, essaybody));
        if (!heading || !essaybody) return;

        resetHandler();
        history.push("/myessays");
    };

    return (
        <MainScreen title="Edit Essay">
            <Card>
                <Card.Header>Edit Essay</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        <Form.Group controlId="heading">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Heading"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="essaybody">
                            <Form.Label>Essay Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Essay Body"
                                rows={5}
                                value={essaybody}
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
                            Update Essay
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Essay
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Last Updated on {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default SingleEssay;
