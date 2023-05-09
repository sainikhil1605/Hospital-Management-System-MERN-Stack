import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { FaBriefcaseMedical, FaMoneyBill } from "react-icons/fa";
import { GiMedicalThermometer } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { RiHospitalFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarText,
  NavbarToggler,
  NavItem,
} from "reactstrap";
function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const Logout = () => {
    dispatch({ type: "LOG_OUT" });
    history.push("/");
  };
  const { role } = jwtDecode(localStorage.getItem("token"));
  console.log(role);
  if (role === "patient") {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#242526" }} dark expand="md">
          <NavbarToggler onClick={() => setOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="mynav">
                <NavLink activeStyle={{ color: "#61dafb" }} to="/doctors">
                  <span>
                    <FaBriefcaseMedical
                      style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    Doctors
                  </span>
                </NavLink>
              </NavItem>
              <NavItem className="mynav">
                <NavLink activeStyle={{ color: "#61dafb" }} to="/user/bills">
                  <span>
                    <FaMoneyBill
                      style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    Bills
                  </span>
                </NavLink>
              </NavItem>
              <NavItem className="mynav">
                <NavLink activeStyle={{ color: "#61dafb" }} to="/carriers">
                  <span>
                    <GiTwoCoins
                      style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    Insurance Carriers
                  </span>
                </NavLink>
              </NavItem>
              <NavItem className="mynav">
                <NavLink activeStyle={{ color: "#61dafb" }} to="/user/profile">
                  <span>
                    <CgProfile
                      style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    Profile
                  </span>
                </NavLink>
              </NavItem>
            </Nav>

            <NavbarText>
              <Button color="danger" onClick={() => Logout()}>
                Logout
              </Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  if (role === "doctor") {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#242526" }} dark expand="md">
          <NavbarToggler onClick={() => setOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="mynav">
                <NavLink activeStyle={{ color: "#61dafb" }} to="/patients">
                  <span>
                    <GiMedicalThermometer
                      style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    Patients
                  </span>
                </NavLink>
              </NavItem>

              <NavItem className="mynav">
                <NavLink
                  activeStyle={{ color: "#61dafb" }}
                  to="/doctor/profile"
                >
                  <span>
                    <CgProfile
                      style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    Profile
                  </span>
                </NavLink>
              </NavItem>
            </Nav>

            <NavbarText>
              <Button color="danger" onClick={() => Logout()}>
                Logout
              </Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  return (
    <div>
      <Navbar style={{ backgroundColor: "#242526" }} dark expand="md">
        <NavbarToggler onClick={() => setOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/doctors/">
                <span>
                  <FaBriefcaseMedical
                    style={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                  Doctors
                </span>
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/patients">
                <span>
                  <GiMedicalThermometer
                    style={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                  Patients
                </span>
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/bills">
                <span>
                  <FaMoneyBill
                    style={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                  Bills
                </span>
              </NavLink>
            </NavItem>

            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/rooms">
                <span>
                  <RiHospitalFill
                    style={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                  Rooms
                </span>
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/carriers">
                <span>
                  <GiTwoCoins
                    style={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                  Insurance Carriers
                </span>
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/admin/profile">
                <span>
                  <CgProfile
                    style={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                  Profile
                </span>
              </NavLink>
            </NavItem>
          </Nav>

          <NavbarText>
            <Button color="danger" onClick={() => Logout()}>
              Logout
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
