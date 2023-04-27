import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";
function AdminProfile() {
  const [adminDetails, setAdminDetails] = useState();
  const { _id } = jwt(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    const getProfile = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/${_id}`);
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
    await axiosInstance.patch(`/admin/${_id}`, { ...adminDetails });
    window.location.reload();
  };
  const handlePasswordChange = async () => {
    try {
      const res = await axiosInstance.patch(`/update/${_id}`, {
        oldPassword,
        newPassword,
        role: "admin",
      });
      if (res.status === 200) {
        setShowChangePassword(false);
        window.alert("Password Changed Successfully");
      }
    } catch (e) {
      console.log(e.response.data.error);
      window.alert(e.response.data.error);
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (showChangePassword) {
    return (
      <div>
        <Row>
          <Col md="3"></Col>
          <Col>
            <h1>Change Password</h1>

            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Old Password</Label>
                </Col>
                <Col sm="10">
                  <Input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => {
                      const temp = e.target.value;
                      setOldPassword(temp);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>New Password</Label>
                </Col>
                <Col sm="10">
                  <Input
                    type="password"
                    name="new-password"
                    value={newPassword}
                    onChange={(e) => {
                      const temp = e.target.value;
                      setNewPassword(temp);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button onClick={() => handlePasswordChange()}>Submit</Button>
            </FormGroup>
          </Col>
          <Col sm="4"></Col>
        </Row>
      </div>
    );
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
              <Row mt="3">
                <Col sm="12">
                  <Button
                    color="primary"
                    onClick={() => setShowChangePassword(true)}
                  >
                    Change Password?
                  </Button>
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
export default AdminProfile;
