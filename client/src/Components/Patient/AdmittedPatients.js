import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdmittedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [showTreatment, setShowTreatment] = useState(false);
  const [treatments, setTreatments] = useState([{ name: "", cost: "" }]);
  const [admissionId, setAdmissionId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const { role, _id } = jwtDecode(localStorage.getItem("token"));
  // if (role === "doctor") {
  //   setShowTreatment(true);
  // }
  // const [showTreatment, setShowTreatment] = useState(
  //   role === "doctor" ? true : false
  // );
  // console.log(showTreatment);
  useEffect(() => {
    const getData = async () => {
      const {
        data: { patients },
      } = await axiosInstance.get("/patient/admitted");
      setPatients(patients);
    };
    getData();
  }, []);
  const history = useHistory();
  const handleDischarge = async (e) => {
    const {
      data: { treatment },
    } = await axiosInstance.post("/treatement", treatments);
    // console.log(treatment);
    const {
      data: { admission },
    } = await axiosInstance.patch(`/patient/admit/${admissionId}`, {
      treatment: treatment,
    });

    const discharge = await axiosInstance.post("/bill", {
      patient_id: patientId,
      admission_id: admissionId,
      discharge_date: new Date(),
    });

    console.log(admission);
    history.push(`/patient/${patientId}`);
  };
  if (showTreatment) {
    return (
      <div>
        <h3>Please Add Treatements for patient before discharge</h3>
        {treatments.map((treatment, index) => (
          <FormGroup>
            <Row>
              <Col sm="2">
                <Label for="docname">Treatment Name</Label>
              </Col>
              <Col sm="4">
                <Input
                  type="text"
                  onChange={(e) => {
                    let temp = treatments;
                    temp[index].name = e.target.value;
                    setTreatments([...temp]);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="2">
                <Label for="docname">Treatment Cost</Label>
              </Col>
              <Col sm="4">
                <Input
                  type="number"
                  onChange={(e) => {
                    let temp = treatments;
                    temp[index].cost = e.target.value;
                    setTreatments([...temp]);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="2">
                <Button
                  color="danger"
                  onClick={() => {
                    let temp = treatments;
                    temp.splice(index, 1);
                    setTreatments([...temp]);
                  }}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </FormGroup>
        ))}
        <Row className="mt-3">
          <Col sm="2">
            <Label for="docname">Add More Treatments?</Label>
          </Col>
          <Col sm="4">
            <Button
              color="primary"
              onClick={() => {
                let temp = treatments;
                temp.push({ name: "", cost: "" });
                setTreatments([...temp]);
              }}
            >
              Add More
            </Button>
          </Col>
        </Row>
        <Button color="primary" onClick={() => handleDischarge()}>
          Submit
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Patient Name</th>
            <th>Admission Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(({ _id, patient_id, admit_date }, index) => (
            <tr key={patient_id._id}>
              <td>{index + 1}</td>
              <td>{patient_id.name}</td>
              <td>{moment(admit_date).format("MM/DD/YYYY")}</td>
              <td>
                <Button
                  id={_id}
                  onClick={(e) => {
                    setAdmissionId(e.target.id);
                    setPatientId(patient_id._id);
                    setShowTreatment(true);
                  }}
                >
                  Discharge Patient
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AdmittedPatients;
