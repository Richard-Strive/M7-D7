import React from "react";
import MainProfileBlock from "./MainProfileBlock";
import Main from "./Main";
import SideBar from "./SideBar";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";

function MainContent(props) {
  let { userName } = useParams();
  const [currentUserName, setCurrentUserName] = React.useState(userName);

  React.useEffect(() => {
    setCurrentUserName(userName);
  }, [userName]);
  if (localStorage.getItem("token")) {
    return (
      <>
        <Container>
          <Row>
            <Col xs={8}>
              <MainProfileBlock userName={currentUserName} loggedInUser={props.userName} contactInfoHandler={props.contactInfoHandler} />
              <Main userName={currentUserName} loggedUser={props.userName} />
            </Col>
            <Col xs={4}>
              <SideBar />
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return <Redirect to='/' />;
  }
}

export default MainContent;
