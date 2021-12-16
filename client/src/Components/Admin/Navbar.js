import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarText,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const Logout = () => {
    dispatch({ type: 'LOG_OUT' });
    history.push('/');
  };
  return (
    <div>
      <Navbar style={{ backgroundColor: '#242526' }} dark expand="md">
        <NavbarToggler onClick={() => setOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <div className="mynav">
              <NavLink
                active
                activeStyle={{ color: '#61dafb' }}
                exact
                to="/admin/addDepartment"
              >
                Departments
              </NavLink>
            </div>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: '#61dafb' }} to="/admin/addDoctor">
                Doctors
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: '#61dafb' }} to="/admin/patients">
                Patients
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: '#61dafb' }} to="/admin/feedback">
                View Feedback
              </NavLink>
            </NavItem>
            <NavItem className="mynav">
              <NavLink activeStyle={{ color: '#61dafb' }} to="/admin/profile">
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
