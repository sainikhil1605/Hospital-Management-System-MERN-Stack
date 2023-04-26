import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Col, Row, Table } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
function Bills() {
  const [bills, setBills] = useState();
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      const {
        data: { bills },
      } = await axiosInstance.get("/bill");

      setBills([...bills]);
    };
    getData();
  }, []);
  if (!bills) {
    return <></>;
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
            <th>Patient Name</th>
            <th>Net Payable Cost</th>
            <th>Discharge Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{bill.patient_id.name}</td>
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
}
export default Bills;
