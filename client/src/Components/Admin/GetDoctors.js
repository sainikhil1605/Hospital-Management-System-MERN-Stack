import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
} from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
import Loader from '../Loader';
function GetDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const role = useSelector((state) => state.login.role);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get('/doctors');
      if (res.status === 200) {
        setDoctors(res.data.doctors);
        setLoading(false);
      }
    };
    getData();
  }, []);
  const handleDelete = async (id) => {
    await axiosInstance.delete(`/doctor/${id}`);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {role !== 'admin' ? (
        <Nav tabs>
          <NavItem>
            <NavLink active>
              <Link to="/patientLogin">Doctor List</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/patientLogin/bookAppointment">Book Appointment</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
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
      ) : (
        <Nav tabs>
          <NavItem>
            <NavLink>
              <Link to="/admin/addDoctor">Add Doctor</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active>
              <Link to="/admin/getDoctors">Doctor List</Link>
            </NavLink>
          </NavItem>
        </Nav>
      )}
      <Row>
        <Col className="mt-2 mr-5" sm="3">
          {' '}
        </Col>
        <Col className="mt-3">
          <Input
            style={{ width: '50%' }}
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table
            striped
            style={{
              width: '50%',
              'box-shadow': '2px 2px 4px 4px #CCCCCC',
              marginTop: '30px',
            }}
          >
            <thead>
              <tr>
                <th>Doctor Id</th>
                <th>Doctor Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {typeof doctors != undefined ? (
                doctors
                  .filter((doctor, index) => {
                    if (search === '') {
                      return doctor;
                    } else if (
                      doctor.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return doctor;
                    }
                  })
                  .map((doctor, index) => {
                    return (
                      <tr>
                        <th scope="row">{doctor.doctor_id}</th>
                        <td>{doctor.name}</td>
                        <td>{doctor.department}</td>
                        {role !== 'admin' ? null : (
                          <td>
                            <Button
                              id={doctor._id}
                              color="danger"
                              onClick={(e) => handleDelete(e.target.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        )}
                      </tr>
                    );
                  })
              ) : (
                <h1>ok</h1>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default GetDoctor;
