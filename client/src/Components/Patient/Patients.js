import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Col, Input, Row, Table } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";
function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get("/patient");
      if (res.status === 200) {
        setPatients(res.data.patients);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    await axiosInstance.delete(`patients/${id}`);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <Row>
          <Col className=" mt-3" style={{ margin: "auto", maxWidth: "1100px" }}>
            <Input
              placeholder="Search..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="mt-3"
              color="primary"
              onClick={() => history.push("/admittedPatients")}
            >
              View Admitted Patients
            </Button>
            <Table
              striped
              style={{
                width: "100%",
                "box-shadow": "2px 2px 4px 4px #CCCCCC",
                marginTop: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Patient Name</th>
                  <th>Patient Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {typeof patients != undefined ? (
                  patients
                    .filter((patient) => {
                      if (search === "") {
                        return patient;
                      } else if (
                        patient.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return patient;
                      }
                    })
                    .map((patient, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{patient.name}</td>
                          <td>{patient.email}</td>
                          <td>
                            <Button
                              color="primary"
                              id={patient._id}
                              onClick={(e) =>
                                history.push(`/patient/edit/${e.target.id}`)
                              }
                            >
                              Edit Patient Details
                            </Button>
                          </td>
                          <td>
                            <Button
                              color="primary"
                              id={patient._id}
                              onClick={(e) =>
                                history.push(`/patient/${e.target.id}`)
                              }
                            >
                              View Bills/Details
                            </Button>
                          </td>
                          <td>
                            <Button
                              id={patient._id}
                              color="primary"
                              onClick={(e) =>
                                history.push(`/admit/${e.target.id}`)
                              }
                            >
                              Admit/Discharge Patient
                            </Button>
                          </td>
                          <td>
                            <Button
                              id={patient._id}
                              color="danger"
                              onClick={(e) => handleDelete(e.target.id)}
                            >
                              Delete
                            </Button>
                          </td>
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
    </div>
  );
}

export default Patients;
