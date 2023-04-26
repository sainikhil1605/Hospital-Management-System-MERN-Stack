import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import _ from "lodash";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";

const PatientDetails = () => {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [bills, setBills] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    const getData = async () => {
      const {
        data: { patient },
      } = await axiosInstance.get(`/patient/${id}`);
      const patientDet = patient[0];
      patientDet["birthdate"] = moment(patientDet["birthdate"]).format(
        "YYYY-MM-DD"
      );

      setPatientDetails(_.omit(patientDet, ["_id", "__v"]));
      //   console.log(_.omit(patient[0], ["_id", "__v"]));
      const {
        data: { bill },
      } = await axiosInstance.get(`/patient/bill/${id}`);
      setBills(bill);
    };

    getData();
  }, []);
  if (patientDetails === null || bills === null) {
    return <Loader />;
  }
  return (
    <Container>
      <Row sm="1" md="1" xs="1">
        <h3>Patient Details</h3>
        <Col>
          <Table stripped bordered className="md-6 xs-6">
            <tbody>
              {Object.keys(patientDetails).map((key) => (
                <tr>
                  <th>{_.startCase(key)}</th>
                  <td>{patientDetails[key]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <h3>Bills</h3>
        <Col>
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
                <th>Total Cost</th>
                <th>Net Payable Cost</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{bill.total_cost}</td>
                    <td>{bill.net_payable_cost}</td>

                    <td>
                      <Button
                        id={bill._id}
                        color="primary"
                        onClick={(e) => history.push(`/bills/${e.target.id}`)}
                      >
                        View Bill
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default PatientDetails;
