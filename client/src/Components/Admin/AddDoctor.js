import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
function AddDoctorForm() {
  const [docDetails, setDocDetails] = useState({});

  const handleSubmit = async () => {
    const res = await axiosInstance.post('/doctors', { ...docDetails });
    if (res === 200) {
      setDocDetails({});
    }
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink active>
            <Link to="/admin/addDoctor">Add Doctor</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/admin/getDoctors">Doctor List</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <Form>
        <FormGroup>
          <Row className="mt-4">
            <Col sm="2">
              <Label for="docname">Name *</Label>
            </Col>
            <Col sm="6">
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
            <Col sm="6">
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
              <Label for="docname">Password *</Label>
            </Col>
            <Col sm="6">
              <Input
                type="password"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, password: e.target.value })
                }
              />

              <small>
                (Must be atleast of length 8 with one Uppercase,a number and a
                special character)
              </small>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Address</Label>
            </Col>
            <Col sm="6">
              <Input
                type="text"
                name="docname"
                onChange={(e) =>
                  setDocDetails({ ...docDetails, address: e.target.value })
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
            <Col sm="6">
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
            <Col sm="6">
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
    </div>
  );
}

export default AddDoctorForm;
