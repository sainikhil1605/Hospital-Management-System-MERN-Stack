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
import jwtDecode from "jwt-decode";
const AdmitPatient = () => {
  const { id } = useParams();

  const [admitData, setAdmitData] = useState({});
  const [doctors, setDoctors] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [currRoom, setCurrRom] = useState({});
  const [carriers, setCarriers] = useState(null);
  const [prevAdmissions, setPrevAdmissions] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatments] = useState([{ name: "", cost: "" }]);
  const [admissionId, setAdmissionId] = useState(null);
  const { role } = jwtDecode(localStorage.getItem("token"));
  const [showTreatment, setShowTreatment] = useState(
    role === "doctor" ? true : false
  );

  const handleSubmit = async () => {
    console.log({ ...admitData, patient_id: id });
    const admit = await axiosInstance.post("/patient/admit", {
      ...admitData,
      patient_id: id,
    });
    history.push("/patients");
  };
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
      patient_id: id,
      admission_id: admissionId,
      discharge_date: new Date(),
    });

    if (role === "doctor") {
      history.push("/patients");
    } else {
      history.push(`/patient/${id}`);
    }
  };

  const hasPreviousAdmission = (admissions) => {
    // console.log(admissions);
    return admissions?.some((admit) => {
      if (admit.bill_id === undefined) {
        // setAdmissionId(admit._id);
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const {
        data: { admission },
      } = await axiosInstance.get(`/patient/admit/${id}`);
      setPrevAdmissions(admission);
      //  else {
      const {
        data: { doctors },
      } = await axiosInstance.get("/doctor");
      // console.log(doctors);
      admission?.some((admit) => {
        if (admit.bill_id === undefined) {
          setAdmissionId(admit._id);
          return true;
        } else {
          return false;
        }
      });
      if (doctors) {
        setDoctors([...doctors]);
      }

      const {
        data: { rooms },
      } = await axiosInstance.get("/room");

      const filteredRooms = await Promise.all(
        rooms.map(async (room) => {
          const {
            data: { room: roomData },
          } = await axiosInstance.get(`/room/${room._id}`);
          // console.log(roomData.length);
          // console.log(room.no_of_beds);
          if (roomData.length < room.no_of_beds) {
            return room;
          }
        })
      ).then((res) => res.filter(Boolean));

      console.log(filteredRooms);

      // getRoomsWithSpace(rooms);

      setRooms(filteredRooms);
      const {
        data: { carriers },
      } = await axiosInstance.get("/carrier");
      setCarriers([...carriers]);
      setLoading(false);
      // }
      // hasPreviousAdmission(prevAdmissions);
    };

    getData();
  }, []);
  useEffect(() => {
    if (role === "doctor") {
      hasPreviousAdmission(prevAdmissions);
    }
    console.log("Boom");
  }, [admissionId]);
  useEffect(() => {}, [treatments]);
  console.log(doctors);
  if (loading && role !== "doctor") {
    return <Loader />;
  }
  // useEffect(() => {}, []);

  // console.log(treatments);
  if (showTreatment) {
    // hasPreviousAdmission(prevAdmissions);
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
                      onClick={(e) => {
                        setAdmissionId(e.target.id);
                        setShowTreatment(true);
                      }}
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
