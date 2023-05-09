import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Input, Row, Table } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";
import { useHistory, useLocation } from "react-router-dom";
function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const role = useSelector((state) => state.login.role);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get("/doctor");
      if (res.status === 200) {
        setDoctors(res.data.doctors);
        setLoading(false);
      }
    };
    getData();
  }, []);
  const handleDelete = async (id) => {
    await axiosInstance.delete(`/doctor/${id}`);
    location.reload();
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Row>
        <Col className="mt-2 mr-5" sm="3">
          {" "}
        </Col>
        <Col className="mt-3">
          <Input
            style={{ width: "50%" }}
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table
            striped
            style={{
              width: "50%",
              "box-shadow": "2px 2px 4px 4px #CCCCCC",
              marginTop: "30px",
            }}
          >
            <thead>
              <tr>
                <th>S.no</th>
                <th>Doctor Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {typeof doctors != undefined ? (
                doctors
                  .filter((doctor, index) => {
                    if (search === "") {
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
                        <th scope="row">{index + 1}</th>
                        <td>{doctor.name}</td>
                        <td>{doctor.department}</td>
                        {role !== "admin" ? null : (
                          <>
                            {/* <td>
                              <Button
                                id={doctor._id}
                                color="danger"
                                onClick={(e) => handleDelete(e.target.id)}
                              >
                                Delete
                              </Button>
                            </td> */}
                            <td>
                              <Button
                                id={doctor._id}
                                color="primary"
                                onClick={(e) =>
                                  history.push(`/doctor/${e.target.id}`)
                                }
                              >
                                Edit
                              </Button>
                            </td>
                          </>
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

export default DoctorList;
