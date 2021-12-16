import React, { useEffect, useState } from 'react';
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
function GetDepartment() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get('/departments');
      if (res.status === 200) {
        setDepartments(res.data.departments);
        setLoading(false);
      }
    };
    getData();
  }, []);
  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/departments/${id}`);
    if (res.status === 200) {
      const index = departments.findIndex(
        (department) => department._id === id
      );
      setDepartments((prevState) => {
        prevState.splice(index, 1);
        return prevState;
      });
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink>
            <Link to="/admin/addDepartment">Add Department</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active>
            <Link to="/adminLogin/deplist">Department List</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <Row>
        <Col className="mt-3" sm="3">
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
                <th>Department Id</th>
                <th>Department Name</th>

                <th style={{ paddingBottom: '25px' }}>
                  Department Description
                </th>
              </tr>
            </thead>
            <tbody>
              {departments
                .filter((dept) => {
                  if (search === '') {
                    return dept;
                  } else if (
                    dept.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return dept;
                  }
                })
                .map((dept, index) => {
                  return (
                    <tr>
                      <th scope="row" id={index}>
                        {index + 1}
                      </th>
                      <td>{dept.name}</td>
                      <td>{dept.description}</td>
                      <td>
                        <Button
                          color="danger"
                          id={dept._id}
                          onClick={(e) => handleDelete(e.target.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default GetDepartment;
