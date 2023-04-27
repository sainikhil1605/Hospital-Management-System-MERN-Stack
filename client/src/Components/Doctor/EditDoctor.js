import { useHistory, useLocation, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";

const EditDoctor = (props) => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  // const [departments, setDepartments] = useState([]);
  //   const [docDetails, setDocDetails] = useState({});
  const location = useLocation();
  const history = useHistory();
  const handleSubmit = async () => {
    const data = await axiosInstance.patch(`/doctor/${id}`, doctor);
    if (data.status === 200) {
      history.push("/doctors");
    }
  };
  useEffect(() => {
    const getData = async () => {
      const {
        data: { doctor },
      } = await axiosInstance.get(`/doctor/${id}`);
      setDoctor(doctor);
    };
    getData();
  }, [id]);
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
                value={doctor.name}
                onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
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
                value={doctor.email}
                onChange={(e) =>
                  setDoctor({ ...doctor, email: e.target.value })
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
                value={doctor.fee}
                onChange={(e) => setDoctor({ ...doctor, fee: e.target.value })}
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
                value={doctor.phone}
                onChange={(e) =>
                  setDoctor({ ...doctor, phone: e.target.value })
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
                value={doctor.department}
                onChange={(e) =>
                  setDoctor({ ...doctor, department: e.target.value })
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
export default EditDoctor;
