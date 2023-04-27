import { Row, Col, FormGroup, Button, Label, Input, Form } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
function EditPatientForm() {
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
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      const {
        data: { patient },
      } = await axiosInstance.get(`/patient/${id}`);
      setPatientDetails(patient?.[0]);
    };
    getData();
  }, []);
  const handleSubmit = async () => {
    const patient = await axiosInstance.patch(`/patient/${id}`, patientDetails);
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
                      value={patientDetails["name"]}
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
                      value={patientDetails["email"]}
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
                    <Label>Address</Label>
                  </Col>
                  <Col sm="10">
                    <Input
                      type="text"
                      value={patientDetails["address"]}
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
                      value={patientDetails["phone"]}
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
                      value={patientDetails["sex"]}
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
                      value={moment(patientDetails["birthdate"])
                        .utc()
                        .format("YYYY-MM-DD")
                        .toString()}
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
export default EditPatientForm;
