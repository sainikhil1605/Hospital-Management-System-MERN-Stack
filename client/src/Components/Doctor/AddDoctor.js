import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";

const AddDoctor = () => {
  const [docDetails, setDocDetails] = useState({});
  const location = useLocation();
  const history = useHistory();
  const handleSubmit = async () => {
    const data = await axiosInstance.post("/doctor", docDetails);
    if (data.status === 201) {
      history.push("/doctors");
    }
  };
  return (
    <>
      <Form className="mt-3" style={{ margin: "auto", maxWidth: "800px" }}>
        <FormGroup>
          <Row className="mt-4">
            <Col sm="2">
              <Label for="docname">Name *</Label>
            </Col>
            <Col sm="8">
              <Input
                type="text"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, name: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Email *</Label>
            </Col>
            <Col sm="8">
              <Input
                type="email"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, email: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="password">Password *</Label>
            </Col>
            <Col sm="8">
              <Input
                type="password"
                name="password"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, password: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Fee</Label>
            </Col>
            <Col sm="8">
              <Input
                type="number"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, fee: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Phone</Label>
            </Col>
            <Col sm="8">
              <Input
                type="phone"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, phone: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Department</Label>
            </Col>
            <Col sm="8">
              <Input
                type="text"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, department: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup style={{ textAlign: "center" }}>
          <Row>
            <Col sm="9">
              <Button color="primary" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};
export default AddDoctor;
