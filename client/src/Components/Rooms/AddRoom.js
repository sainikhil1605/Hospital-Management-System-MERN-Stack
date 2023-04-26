import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const AddRoom = () => {
  const [roomData, setRoomData] = useState();
  const history = useHistory();
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const {
      data: { room },
    } = await axiosInstance.post("/room", roomData);
    history.push(`/rooms/${room._id}`);
  };
  return (
    <div>
      <h1>Add Room</h1>
      <Form className="mt-3" style={{ margin: "auto", maxWidth: "800px" }}>
        <FormGroup>
          <Row className="mt-4">
            <Col sm="2">
              <Label for="docname">Room Number</Label>
            </Col>
            <Col sm="8">
              <Input
                type="text"
                name="room_no"
                onChange={(e) =>
                  setRoomData({ ...roomData, room_no: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Cost Per Day</Label>
            </Col>
            <Col sm="8">
              <Input
                type="number"
                name="cost_per_day"
                onChange={(e) =>
                  setRoomData({ ...roomData, cost_per_day: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Number of Beds</Label>
            </Col>
            <Col sm="8">
              <Input
                type="number"
                name="no_of_beds"
                onChange={(e) =>
                  setRoomData({ ...roomData, no_of_beds: e.target.value })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="2">
              <Label for="docname">Meal Cost Per Day</Label>
            </Col>
            <Col sm="8">
              <Input
                type="number"
                name="meal_cost_per_day"
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    meal_cost_per_day: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup style={{ textAlign: "center" }}>
          <Row>
            <Col sm="9">
              <Button color="primary" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
};

export default AddRoom;
