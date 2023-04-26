import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";

const ViewRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      const {
        data: { room },
      } = await axiosInstance.get(`/room/${id}`);

      setPatients(room);
    };
    getData();
  }, [id]);
  return (
    <div>
      <h1>Patients</h1>
      <Table
        striped
        style={{
          width: "50%",
          "box-shadow": "2px 2px 4px 4px #CCCCCC",
          marginTop: "30px",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {typeof doctors != undefined ? (
            patients
              .filter((doctor, index) => {
                if (search === "") {
                  return doctor;
                } else if (
                  doctor.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return doctor;
                }
              })
              .map(({ patient_id: patient }, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                  </tr>
                );
              })
          ) : (
            <h1>ok</h1>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ViewRoom;
