import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";
import moment from "moment";
import { DatePicker } from "reactstrap-date-picker";
const AdmitPatient = () => {
  const { id } = useParams();

  const [admitData, setAdmitData] = useState({});
  const [doctors, setDoctors] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [currRoom, setCurrRom] = useState({});
  const [carriers, setCarriers] = useState(null);
  const [prevAdmissions, setPrevAdmissions] = useState(null);
  const history = useHistory();

  const handleSubmit = async () => {
    console.log({ ...admitData, patient_id: id });
    const admit = await axiosInstance.post("/patient/admit", {
      ...admitData,
      patient_id: id,
    });
    history.push("/patients");
  };
  const handleDischarge = async (e) => {
    const discharge = await axiosInstance.post("/bill", {
      patient_id: id,
      admission_id: e.target.id,
      discharge_date: new Date(),
    });
    history.push(`/patient/${id}`);
  };
  useEffect(() => {
    const getData = async () => {
      const {
        data: { admission },
      } = await axiosInstance.get(`/patient/admit/${id}`);
      setPrevAdmissions(admission);
      const {
        data: { doctors },
      } = await axiosInstance.get("/doctor");
      setDoctors(doctors);
      const {
        data: { rooms },
      } = await axiosInstance.get("/room");
      setRooms(rooms);
      const {
        data: { carriers },
      } = await axiosInstance.get("/carrier");
      setCarriers(carriers);
    };
    getData();
  }, []);
  if (!doctors) {
    return <Loader />;
  }
  const hasPreviousAdmission = (admissions) => {
    return admissions.some((admit) => {
      if (admit.bill_id === undefined) {
        return true;
      } else {
        return false;
      }
    });
  };
  if (hasPreviousAdmission(prevAdmissions)) {
    return (
      <div>
        <Table striped size="small">
          <thead>
            <th>
              <tr>Admit Date</tr>
            </th>
            <th>Reason For Admit</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {prevAdmissions.map((admission) => (
              <tr>
                <td>{moment(admission.admit_date).format("YYYY-MM-DD")}</td>
                <td>{admission.reason_for_admit}</td>
                <td>
                  {admission.bill_id !== undefined ? (
                    <Button
                      id={admission.bill_id}
                      onClick={(e) => history.push(`/bills/${e.target.id}`)}
                    >
                      View Bill
                    </Button>
                  ) : (
                    <Button
                      id={admission._id}
                      color="danger"
                      onClick={(e) => handleDischarge(e)}
                    >
                      Discharge Patient
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <Form className="ml-3">
      <div style={{ margin: "auto", maxWidth: "1000px" }}>
        <h1>Admit Patient</h1>
        <FormGroup>
          <Row className="mt-4">
            <Col sm="2">
              <Label for="docname">Doctor </Label>
            </Col>
            <Col sm="6">
              <Input
                type="select"
                name="docname"
                value={admitData.doctor_id}
                onChange={(e) => {
                  setAdmitData({ ...admitData, doctor_id: e.target.value });
                }}
              >
                <option hidden></option>
                {doctors?.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Room No </Label>
            </Col>
            <Col sm="6">
              <Input
                type="select"
                name="docname"
                onChange={(e) => {
                  setAdmitData({ ...admitData, room_id: e.target.value });
                  const index = rooms.findIndex(
                    (item) => item._id === e.target.value
                  );
                  setCurrRom(rooms[index]);
                }}
                value={admitData.room_id}
              >
                <option hidden></option>
                {rooms?.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.room_no}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Room Cost </Label>
            </Col>
            <Col sm="6">
              <Input
                type="text"
                name="roomcost"
                disabled
                value={currRoom.cost_per_day}
              ></Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Meals Cost Per Day</Label>
            </Col>
            <Col sm="6">
              <Input
                type="text"
                name="roomcost"
                disabled
                value={currRoom.meal_cost_per_day}
              ></Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Insurance Carrier </Label>
            </Col>
            <Col sm="6">
              <Input
                type="select"
                name="docname"
                onChange={(e) => {
                  setAdmitData({ ...admitData, insurance_id: e.target.value });
                }}
                value={admitData.insurance_id}
              >
                <option hidden></option>
                {carriers?.map((carrier) => (
                  <option key={carrier._id} value={carrier._id}>
                    {carrier.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Admit Date</Label>
            </Col>
            <Col sm="6">
              <DatePicker
                type="date"
                name="docname"
                maxDate={new Date().toISOString()}
                value={admitData.admit_date}
                onChange={(value) =>
                  setAdmitData({ ...admitData, admit_date: value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Reason For Admit</Label>
            </Col>
            <Col sm="6">
              <Input
                type="text"
                name="docname"
                onChange={(e) =>
                  setAdmitData({
                    ...admitData,
                    reason_for_admit: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="9">
              <Button color="primary" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </div>
    </Form>
  );
};

export default AdmitPatient;
