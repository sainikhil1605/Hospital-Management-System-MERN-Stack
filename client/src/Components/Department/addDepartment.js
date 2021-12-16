import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

function AddDepartmentForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const role = useSelector((state) => state.login.role);
  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post('/departments', {
        role,
        name,
        description,
      });
      if (res.status === 200) {
        setMessage('Department added successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink active>
            <Link to="#">Add Department</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/admin/getDepartment">Department List</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <Form>
        <FormGroup>
          <Row className="mt-4">
            <Col>{message}</Col>
          </Row>
          <Row className="mt-4">
            <Col md="2">
              <Label for="depName">Department Name</Label>
            </Col>
            <Col md="6">
              <Input
                name="depName"
                id="depName"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row className="mt-4">
            <Col md="2">
              <Label for="depDesc">Department Description</Label>
            </Col>
            <Col md="6">
              <Input
                name="depDesc"
                id="depDesc"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
        </FormGroup>
        <Button color="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default AddDepartmentForm;
