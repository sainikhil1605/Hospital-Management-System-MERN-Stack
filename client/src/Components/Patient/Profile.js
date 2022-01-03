import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
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

function Profile() {
  const [patientDetails, setPatientDetails] = useState({});
  const { _id } = jwt(localStorage.getItem('token'));
  useEffect(() => {
    const res = axiosInstance.get(`/patients/${_id}`);
    if (res.status === 200) {
      setPatientDetails(res.data.patient);
    }
  }, [_id]);
  const handleSubmit = async () => {
    const res = await axiosInstance.post(`/patients/${id}`, {
      ...patientDetails,
    });
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink>
            <Link to="/patientLogin">Doctor List</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/patientLogin/bookAppointment">Book Appointment</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active>
            <Link to="/patientLogin/getPatientProfile">Edit Profile</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/patientLogin/patientAppointments">
              View Appointments
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
      <Row className="mt-4">
        <Col>
          <h1>Edit Profile</h1>
          <Form>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Name</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={this.state.Name}
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
              <Row mt="3">
                <Col sm="2">
                  <Label>Email</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={this.state.Email}
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
              <Row mt="3">
                <Col sm="2">
                  <Label>Phone Number</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={this.state.Phone}
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
              <Row mt="3">
                <Col sm="2">
                  <Label>Adress</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={this.state.Address}
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
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col sm="6"></Col>
      </Row>
    </div>
  );
}

export default Profile;
