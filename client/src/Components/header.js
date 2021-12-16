import { Col, Jumbotron, Row } from 'reactstrap';

function Header({ msg }) {
  return (
    <Jumbotron className="header">
      <Row>
        <Col md="12">
          <h1 style={{ fontFamily: 'cursive' }}>Welcome!!! {msg}</h1>
        </Col>
      </Row>
    </Jumbotron>
  );
}
export default Header;
