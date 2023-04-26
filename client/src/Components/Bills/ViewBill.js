import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Col, Row, Table } from "reactstrap";
import moment from "moment";
import _ from "lodash";
function ViewBill() {
  const { billId } = useParams();
  const [bill, setBill] = useState();
  const formatBill = (bill) => {
    const formatedBill = {};
    if (bill !== null && bill !== undefined) {
      Object?.keys(bill)?.forEach((key) => {
        if (key === "admission_id") {
          formatedBill.doctor_name = bill[key]["doctor_id"]["name"];
          formatedBill.doctor_fee = bill[key]["doctor_id"]["fee"];
          formatedBill.insurance_name = bill[key]["insurance_id"]["name"];
          formatedBill.insurance_percentage =
            bill[key]["insurance_id"]["percentage"];
          formatedBill.admit_date = moment(bill[key].admit_date).format(
            "YYYY-MM-DD"  
          );
        } else if (key === "patient_id") {
          formatedBill.patient_name = bill[key].name;
        } else {
          if (key !== "__v") {
            formatedBill[key] = bill[key];
          }
          if (key === "discharge_date") {
            formatedBill[key] = moment(bill[key]).format("YYYY-MM-DD");
          }
        }
      });
    }
    return formatedBill;
  };
  useEffect(() => {
    const getData = async () => {
      const {
        data: { bill },
      } = await axiosInstance.get(`/bill/${billId}`);
      if (bill !== null || bill !== undefined) {
        const formatedBill = formatBill(bill);

        setBill(_.omit(formatedBill, ["_id"]));
      }
    };
    getData();
  }, []);
  if (!bill) {
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
        <tbody>
          {Object.keys(bill).map((key) => {
            // if (typeof bill[key] === "object") {
            //   return (
            //     <tr>
            //       <th>{key.split("_")[0] + " name"}</th>
            //       <td>{bill[key]?.name || bill[key]?.room_no}</td>
            //     </tr>
            //   );
            // } else {
            return (
              <tr>
                <th>{_.startCase(key.split("_").join("  "))}</th>
                <td>{bill[key]}</td>
              </tr>
            );
            // }
          })}
        </tbody>
      </Table>
    </Row>
  );
}
export default ViewBill;
