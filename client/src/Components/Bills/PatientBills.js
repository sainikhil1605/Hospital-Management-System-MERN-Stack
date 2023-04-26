import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Col, Row, Table } from "reactstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";
const PatientBills = () => {
  const { _id: patientId } = jwt(localStorage.getItem("token"));
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    const getData = async () => {
      setLoading(true);
      const {
        data: { bill },
      } = await axiosInstance.get(`/patient/bill/${patientId}`);
      setBills(bill);
      setLoading(false);
    };
    getData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <Row>
      <Col className="mt-2 mr-5" sm="3" />

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
            <th>S.No</th>

            <th>Net Payable Cost</th>
            <th>Discharge Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>

                <td>{bill.net_payable_cost}</td>
                <td>{moment(bill.discharge_date).format("YYYY-MM-DD")}</td>
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
    </Row>
  );
};
export default PatientBills;
