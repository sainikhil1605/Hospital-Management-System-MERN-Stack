import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import jwtDecode from "jwt-decode";
import { Table } from "reactstrap";
import moment from "moment";

const PreviousPatients = () => {
  const [patients, setPatients] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { _id } = jwtDecode(localStorage.getItem("token"));
      const {
        data: { patients },
      } = await axiosInstance.get(`/doctor/previousPatients/${_id}`);
      setPatients(patients);
    };
    getData();
  }, []);
  if (!patients) {
    return <div></div>;
  }
  return (
    <div>
      <Table striped>
        <thead>
          <td>S.No</td>
          <td>Name</td>
          <td>Admit Date</td>
        </thead>
        {patients.map((patient, index) => (
          <tr>
            <td>{index + 1}</td>

            <td>{patient.patient_id.name}</td>
            <td>{moment(patient.admit_date).format("MM-DD-YYYY")}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
export default PreviousPatients;
