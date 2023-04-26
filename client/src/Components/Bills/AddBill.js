import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";

const AddBill = () => {
  const [bill, setBillDetails] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getPatients = async () => {
      const {
        data: { patients },
      } = await axiosInstance.get("/patient");
      setPatients(patients);
    };
    const getDoctors = async () => {
      const {
        data: { doctors },
      } = await axiosInstance.get("/doctor");
      setDoctors(doctors);
    };

    getPatients();
    getDoctors();
  }, []);
  const handleSubmit = () => {
    console.log(bill);
  };
  return (
    <Form className="ml-3">
      <FormGroup>
        <Row className="mt-4">
          <Col sm="2">
            <Label for="docname">Name *</Label>
          </Col>
          <Col sm="6">
            <Input
              type="select"
              name="docname"
              onChange={(e) =>
                setBillDetails({ ...bill, name: e.target.value })
              }
            >
              {patients.map((patient) => (
                <option value={patient._id}>{patient.name}</option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm="2">
            <Label for="docname">Doctor *</Label>
          </Col>
          <Col sm="6">
            <Input
              type="select"
              name="docname"
              onChange={(e) =>
                setBillDetails({ ...bill, name: e.target.value })
              }
            >
              {doctors.map((doctor) => (
                <option value={doctor._id}>{doctor.name}</option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row></Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm="2">
            <Label for="docname">Email *</Label>
          </Col>
          <Col sm="6">
            <Input
              type="email"
              name="docname"
              onChange={(e) =>
                setBillDetails({ ...bill, email: e.target.value })
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
          <Col sm="6">
            <Input
              type="number"
              name="docname"
              onChange={(e) => setBillDetails({ ...bill, fee: e.target.value })}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm="2">
            <Label for="docname">Phone</Label>
          </Col>
          <Col sm="6">
            <Input
              type="phone"
              name="docname"
              onChange={(e) =>
                setBillDetails({ ...bill, phone: e.target.value })
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
          <Col sm="6">
            <Input
              type="text"
              name="docname"
              onChange={(e) =>
                setBillDetails({ ...bill, department: e.target.value })
              }
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm="9">
            <Button color="primary" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default AddBill;
