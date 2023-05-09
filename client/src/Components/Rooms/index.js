import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Col, Table } from "reactstrap";
import { useHistory } from "react-router-dom";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      const {
        data: { rooms },
      } = await axiosInstance.get("/room");
      setRooms([...rooms]);
    };
    getData();
  }, []);
  return (
    <div style={{ style: "100%" }}>
      <Col className="mt-3 mb-3">
        <h1>Rooms</h1>
        <Table
          striped
          style={{
            width: "85%",
            "box-shadow": "2px 2px 4px 4px #CCCCCC",
            marginTop: "30px",
            margin: "auto",
          }}
        >
          <thead>
            <tr>
              <th>S.no</th>
              <th>Room Number</th>
              <th>Cost Per Day</th>
              <th>Meal Cost Per Day</th>
              <th>Total No of Beds</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{room.room_no}</td>
                  <td>{room.cost_per_day}</td>
                  <td>{room.meal_cost_per_day}</td>
                  <td>{room.no_of_beds}</td>

                  <td>
                    <Button
                      color="primary"
                      style={{ width: "100%" }}
                      id={room._id}
                      onClick={(e) => history.push(`/rooms/${e.target.id}`)}
                    >
                      View Patients
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="primary"
                      style={{ width: "100%" }}
                      id={room._id}
                      onClick={(e) =>
                        history.push(`/rooms/edit/${e.target.id}`)
                      }
                    >
                      Edit Room Details
                    </Button>
                  </td>
                  {/* <td>
                    <Button
                      color="danger"
                      style={{ width: "100%" }}
                      id={room._id}
                      onClick={async (e) => {
                        await axiosInstance.delete(`/room/${e.target.id}`);
                        window.location.reload();
                      }}
                    >
                      Delete
                    </Button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </div>
  );
};
export default Rooms;
