import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
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
                <NavLink activeStyle={{ color: "#61dafb" }} to="/user/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem className="mynav">
                <NavLink activeStyle={{ color: "#61dafb" }} to="/user/bills">
                  Bills
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
                Doctors
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/patients">
                Patients
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/bills">
                Bills
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: "#61dafb" }} to="/admin/profile">
                Profile
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
