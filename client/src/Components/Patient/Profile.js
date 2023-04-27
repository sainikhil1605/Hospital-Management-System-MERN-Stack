import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";

function Profile() {
  const [patientDetails, setPatientDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { _id } = jwt(localStorage.getItem("token"));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`/patient/${_id}`);
      if (res.status === 200) {
        setPatientDetails(res.data.patient?.[0]);
        setLoading(false);
      }
    };
    getData();
  }, [_id]);
  const handleSubmit = async () => {
    const res = await axiosInstance.patch(`/patient/${_id}`, {
      ...patientDetails,
    });
    alert("Details Updated Successfully");
  };
  const handlePasswordChange = async () => {
    try {
      const res = await axiosInstance.patch(`/update/${_id}`, {
        oldPassword,
        newPassword,
        role: "patient",
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

  console.log(patientDetails);
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
      <Row className="mt-4">
        <Col className="mt-4"></Col>
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
                    value={patientDetails?.name}
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
                    value={patientDetails?.email}
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
                    value={patientDetails?.phone}
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
                    value={patientDetails?.address}
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
        <Col sm="6"></Col>
      </Row>
    </div>
  );
}

export default Profile;
