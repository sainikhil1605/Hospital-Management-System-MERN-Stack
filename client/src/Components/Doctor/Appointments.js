import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Table } from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
import NavBar from './NavBar';
function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [prescription, setPrescription] = useState('');
  useEffect(() => {
    const { _id } = jwt(localStorage.getItem('token'));
    const getData = async () => {
      const res = await axiosInstance.get(`/doctors/${_id}/appointments`);
      if (res.status === 200) {
        setAppointments(res.data.appointments);
      }
    };
    getData();
  }, []);
  const handlePres = async (appointment) => {
    this.setState({ isOpen: false });
    console.log(this.state);
    console.log(appointment);
    await axiosInstance.post(`doctors/appointments/${appointment._id}`, {
      prescription: prescription,
    });
  };

  return (
    <div>
      <NavBar />
      <Row>
        <Col className="mt-3" sm="3"></Col>
        <Col className="mt-3">
          <Input
            style={{ width: '50%' }}
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table
            striped
            style={{
              width: '50%',
              'box-shadow': '2px 2px 4px 4px #CCCCCC',
              marginTop: '30px',
            }}
          >
            <thead>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Phone Number</th>
            </thead>
            {typeof appointments != undefined
              ? appointments
                  .filter((appointment) => {
                    if (search === '') {
                      return appointment;
                    } else if (
                      appointment.patient_name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return appointment;
                    }
                  })
                  .map((appointment) => {
                    return (
                      <tr>
                        <td>{appointment.name}</td>
                        <td>{appointment.description}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.phone}</td>
                        {isOpen ? (
                          <td></td>
                        ) : (
                          <td>
                            <Button
                              style={{
                                backgroundColor: 'green',
                              }}
                              onClick={() => setOpen(true)}
                            >
                              Prescribe
                            </Button>
                          </td>
                        )}
                        {this.state.isOpen ? (
                          <td
                            style={{
                              columnWidth: '200px',
                            }}
                          >
                            <Input
                              type="text"
                              onChange={(e) => setPrescription(e.target.value)}
                            />
                            <Button
                              style={{
                                backgroundColor: 'green',
                              }}
                              className="mt-2"
                              onClick={() => handlePres(appointment)}
                            >
                              Add
                            </Button>
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    );
                  })
              : null}
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Appointments;
