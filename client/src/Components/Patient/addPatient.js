import { Row, Col, FormGroup, Button, Label, Input, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
function AddPatientForm() {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    sex: "",
    birthdate: "",
    age: "",
  });
  const history = useHistory();
  const handleSubmit = async () => {
    const patient = await axiosInstance.post("/patient", patientDetails);
    history.push("/patients");
  };
  return (
    <div>
      <Row>
        <Col sm="2"></Col>
        <Col>
          <div>
            <Form style={{ marginTop: "25px" }}>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Name *</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="text"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Email *</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="email"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Password *</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="password"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          password: e.target.value,
                        })
                      }
                    />
                    {/* <small>
                      (Must be atleast of length 8 with one Uppercase,one
                      Lowercase,a number and a special character)
                    </small> */}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Address</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="text"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          address: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Phone</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="phone"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Sex</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="text"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          sex: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Birthdate</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="date"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          birthdate: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Age *</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="number"
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          age: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col sm="2"></Col>
                  <Col sm="10">
                    <Button color="primary" onClick={(e) => handleSubmit()}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </div>
        </Col>
        <Col sm="4"></Col>
      </Row>
    </div>
  );
}
export default AddPatientForm;
