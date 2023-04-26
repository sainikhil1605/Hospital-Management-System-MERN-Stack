import { Card, CardBody, CardImg, CardTitle, Col } from "reactstrap";
import admin from "../../assets/admin.png";
export default function LoginCard({ role }) {
  return (
    <Col sm="12" md="4">
      <Card style={{ "box-shadow": "4px 4px 4px 4px #CCCCCC" }}>
        <CardImg top width="10%" src={admin} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h1">Hello!! {role.toUpperCase()}</CardTitle>
        </CardBody>
      </Card>
    </Col>
  );
}
