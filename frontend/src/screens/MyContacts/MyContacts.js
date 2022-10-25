import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteContactAction, listContacts } from "../../actions/contactsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyContacts({ history, search }) {
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;

  const contactCreate = useSelector((state) => state.contactCreate);
  const { success: successCreate } = contactCreate;

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { success: successUpdate } = contactUpdate;

  useEffect(() => {
    dispatch(listContacts());
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
      dispatch(deleteContactAction(id));
    }
  };

  return (
    <MainScreen title={`My Contacts`}>
      {console.log(contacts)}
      <Link to="/createcontact">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Contact
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {contacts &&
        contacts
          .filter((filteredContact) =>
            filteredContact.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((contact) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={contact._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
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
                      {contact.name}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/contact/${contact._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(contact._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Name - {contact.name}
                      </Badge>
                    </h4>
                    <h4>
                      <Badge variant="success">
                        Email - {contact.email}                   
                      </Badge>
                    </h4>
                    <h4>
                      <Badge variant="success">
                        Mobile - {contact.mobile}                      
                      </Badge>
                    </h4>
                    
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{contact.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {contact.createdAt.substring(0, 10)}
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

export default MyContacts;
