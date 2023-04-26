import { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const AddCarrier = () => {
  const [carrier, setCarrier] = useState({
    name: "",
    percentage: "",
  });
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axiosInstance.post("/carrier", carrier);
    history.push(`/carriers`);
  };
  return (
    <div>
      <h1>Add Carrier</h1>
      <Form className="mt-3" style={{ margin: "auto", maxWidth: "800px" }}>
        <FormGroup>
          <Row className="mt-4">
            <Col sm="2">
              <Label for="docname">Carrier Name</Label>
            </Col>
            <Col sm="8">
              <Input
                type="text"
                name="name"
                onChange={(e) =>
                  setCarrier({ ...carrier, name: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Carrier Percentage</Label>
            </Col>
            <Col sm="8">
              <Input
                type="number"
                name="percentage"
                onChange={(e) =>
                  setCarrier({ ...carrier, percentage: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};
export default AddCarrier;
