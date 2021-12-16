import axios from 'axios';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
function GetProfile() {
  const [adminDetails, setAdminDetails] = useState();
  const { _id } = jwt.decode(localStorage.getItem('token'));
  useEffect(() => {
    const getProfile = async () => {
      const res = await axiosInstance.post(`/admins/${_id}`);
      if (res.status === 200) {
        setAdminDetails(res.data.admin);
      } else {
        console.log(res.data.error);
      }
    };
    getProfile();
  }, []);
  const handleSubmit = async () => {
    await axios.post('/admin', { ...adminDetails });
  };

  return (
    <div>
      <Row>
        <Col md="3"></Col>
        <Col>
          <h1 style={{ fontFamily: 'cursive' }}>Edit Profile</h1>
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
                      this.setState({
                        Name: e.target.value,
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
                      this.setState({
                        Email: e.target.value,
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
                      this.setState({
                        Phone: e.target.value,
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
                      this.setState({
                        Address: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button onClick={(e) => this.handleSubmit(e)}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col sm="4"></Col>
      </Row>
    </div>
  );
}
export default GetProfile;
