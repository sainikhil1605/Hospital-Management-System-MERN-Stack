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
          formatedBill.treatments = bill[key].treatments;
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
    <>
      <Row>
        <Col className="mt-2 m-auto" sm="10">
          <h3>Treatments</h3>
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
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill["treatments"].map((treatement) => (
                <tr>
                  <td>{treatement.name}</td>
                  <td>{treatement.cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2 m-auto" sm="10">
          <h3>Bill</h3>
          <Table
            striped
            style={{
              width: "100%",
              "box-shadow": "2px 2px 4px 4px #CCCCCC",
              marginTop: "30px",
            }}
          >
            <tbody>
              {Object.keys(bill).map((key) => {
                if (key === "treatments") {
                  return <></>;
                } else {
                  return (
                    <tr>
                      <th>{_.startCase(key.split("_").join("  "))}</th>
                      <td>{bill[key]}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
export default ViewBill;
