import { Col, Jumbotron, Row } from 'reactstrap';

function Header({ msg }) {
  return (
    <Jumbotron className="header">
      <Row>
        <Col md="12">
          <h1>Welcome!!! {msg}</h1>
        </Col>
      </Row>
    </Jumbotron>
  );
}
export default Header;
