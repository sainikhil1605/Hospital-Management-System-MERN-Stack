import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Col, Input, Row, Table } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";
import jwtDecode from "jwt-decode";
function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();
  // const [role, setRole] = useState("");
  const { role, _id } = jwtDecode(localStorage.getItem("token"));
  useEffect(() => {
    const getData = async () => {
      if (role === "doctor") {
        const {
          data: { patients },
        } = await axiosInstance.get(`/doctor/patients/${_id}`);
        setPatients([...patients]);
        setLoading(false);
      } else {
        setLoading(true);
        const res = await axiosInstance.get("/patient");
        if (res.status === 200) {
          setPatients(res.data.patients);
          setLoading(false);
        }
      }
    };
    getData();
  }, [role, _id]);

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/patient/${id}`);
    location.reload();
  };
  if (loading || role === undefined) {
    return <Loader />;
  }
  console.log(role);
  // if (role === "doctor") {
  //   <div>
  //     <Row>
  //       <Col className=" mt-3" style={{ margin: "auto", maxWidth: "1100px" }}>
  //         <Input
  //           placeholder="Search..."
  //           type="text"
  //           onChange={(e) => setSearch(e.target.value)}
  //         />

  //         <Table
  //           striped
  //           style={{
  //             width: "100%",
  //             "box-shadow": "2px 2px 4px 4px #CCCCCC",
  //             marginTop: "30px",
  //           }}
  //         >
  //           <thead>
  //             <tr>
  //               <th>S.No</th>
  //               <th>Patient Name</th>
  //               <th>Patient Email</th>
  //               <th>Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {typeof patients != undefined ? (
  //               patients
  //                 .filter((patient) => {
  //                   if (search === "") {
  //                     return patient;
  //                   } else if (
  //                     patient.name.toLowerCase().includes(search.toLowerCase())
  //                   ) {
  //                     return patient;
  //                   }
  //                 })
  //                 .map((patient, index) => {
  //                   return (
  //                     <tr>
  //                       <th scope="row">{index + 1}</th>
  //                       <td>{patient.name}</td>
  //                       <td>{patient.email}</td>
  //                       <td>
  //                         <Button
  //                           color="primary"
  //                           id={patient._id}
  //                           onClick={(e) =>
  //                             history.push(`/patient/edit/${e.target.id}`)
  //                           }
  //                         >
  //                           Edit Patient Details
  //                         </Button>
  //                       </td>
  //                       <td>
  //                         <Button
  //                           color="primary"
  //                           id={patient._id}
  //                           onClick={(e) =>
  //                             history.push(`/patient/${e.target.id}`)
  //                           }
  //                         >
  //                           View Bills/Details
  //                         </Button>
  //                       </td>
  //                       <td>
  //                         <Button
  //                           id={patient._id}
  //                           color="primary"
  //                           onClick={(e) =>
  //                             history.push(`/admit/${e.target.id}`)
  //                           }
  //                         >
  //                           Admit/Discharge Patient
  //                         </Button>
  //                       </td>
  //                       {/* <td>
  //                       <Button
  //                         id={patient._id}
  //                         color="danger"
  //                         onClick={(e) => handleDelete(e.target.id)}
  //                       >
  //                         Delete
  //                       </Button>
  //                     </td> */}
  //                     </tr>
  //                   );
  //                 })
  //             ) : (
  //               <h1>ok</h1>
  //             )}
  //           </tbody>
  //         </Table>
  //       </Col>
  //     </Row>
  //   </div>;
  // }

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
            {role !== "doctor" && (
              <Button
                className="mt-3"
                color="primary"
                onClick={() => history.push("/admittedPatients")}
              >
                View Admitted Patients
              </Button>
            )}
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
                  {role === "doctor" && <th>Reason for admit</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              {role !== "doctor" && (
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
                            <>
                              {role === "doctor" && (
                                <>
                                  <td>
                                    <Button
                                      id={patient._id}
                                      color="primary"
                                      onClick={(e) =>
                                        history.push(`/admit/${e.target.id}`)
                                      }
                                    >
                                      Discharge Patient
                                    </Button>
                                  </td>
                                </>
                              )}
                              {role !== "doctor" && (
                                <>
                                  <td>
                                    <Button
                                      color="primary"
                                      id={patient._id}
                                      onClick={(e) =>
                                        history.push(
                                          `/patient/edit/${e.target.id}`
                                        )
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
                                </>
                              )}
                            </>
                            {/* <td>
                            <Button
                              id={patient._id}
                              color="danger"
                              onClick={(e) => handleDelete(e.target.id)}
                            >
                              Delete
                            </Button>
                          </td> */}
                          </tr>
                        );
                      })
                  ) : (
                    <h1>ok</h1>
                  )}
                </tbody>
              )}
              {role === "doctor" && (
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
                      .map(
                        ({ reason_for_admit, patient_id: patient }, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{patient.name}</td>
                              <td>{patient.email}</td>
                              <td>{reason_for_admit}</td>
                              <>
                                {role === "doctor" && (
                                  <>
                                    <td>
                                      <Button
                                        id={patient._id}
                                        color="primary"
                                        onClick={(e) =>
                                          history.push(`/admit/${e.target.id}`)
                                        }
                                      >
                                        Discharge Patient
                                      </Button>
                                    </td>
                                  </>
                                )}
                                {role !== "doctor" && (
                                  <>
                                    <td>
                                      <Button
                                        color="primary"
                                        id={patient._id}
                                        onClick={(e) =>
                                          history.push(
                                            `/patient/edit/${e.target.id}`
                                          )
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
                                          history.push(
                                            `/patient/${e.target.id}`
                                          )
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
                                  </>
                                )}
                              </>
                              {/* <td>
                            <Button
                              id={patient._id}
                              color="danger"
                              onClick={(e) => handleDelete(e.target.id)}
                            >
                              Delete
                            </Button>
                          </td> */}
                            </tr>
                          );
                        }
                      )
                  ) : (
                    <h1>ok</h1>
                  )}
                </tbody>
              )}
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Patients;
