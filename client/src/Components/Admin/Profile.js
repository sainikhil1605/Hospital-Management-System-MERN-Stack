import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
import Loader from '../Loader';
function Profile() {
  const [adminDetails, setAdminDetails] = useState();
  const { _id } = jwt(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`/admins/${_id}`);
      if (res.status === 200) {
        setAdminDetails(res.data.admin);
        setLoading(false);
      } else {
        console.log(res.data.error);
      }
    };
    getProfile();
  }, []);
  const handleSubmit = async () => {
    await axiosInstance.update(`/admins/${_id}`, { ...adminDetails });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Row>
        <Col md="3"></Col>
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
                    value={adminDetails.name}
                    onChange={(e) => {
                      const temp = e.target.value;
                      setAdminDetails({ ...adminDetails, name: temp });
                    }}
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
                    value={adminDetails.email}
                    onChange={(e) => {
                      const temp = e.target.value;
                      setAdminDetails({ ...adminDetails, email: temp });
                    }}
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
                    value={adminDetails.phone}
                    onChange={(e) => {
                      const temp = e.target.value;
                      setAdminDetails({ ...adminDetails, phone: temp });
                    }}
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
                    value={adminDetails.address}
                    onChange={(e) => {
                      const temp = e.target.value;
                      setAdminDetails({ ...adminDetails, address: temp });
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col sm="4"></Col>
      </Row>
    </div>
  );
}
export default Profile;
