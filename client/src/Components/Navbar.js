import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarText,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Department',
    };
  }
  handleClick(e) {
    this.setState({ active: e.target.innerHTML });
  }
  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: '#242526' }} dark expand="md">
          <NavbarToggler
            onClick={() =>
              this.setState((prevState) => ({
                isOpen: !prevState.isOpen,
              }))
            }
          />
          <Collapse isOpen={this.state.isOpen} navbar>
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
                <NavLink
                  activeStyle={{ color: '#61dafb' }}
                  to="/admin/addDoctor"
                >
                  Doctors
                </NavLink>
              </NavItem>
              <NavItem className="mynav">
                <NavLink
                  activeStyle={{ color: '#61dafb' }}
                  to="/admin/patients"
                >
                  Patients
                </NavLink>
              </NavItem>
              <NavItem className="mynav">
                <NavLink
                  activeStyle={{ color: '#61dafb' }}
                  to="/admin/feedback"
                >
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
              <Button color="danger" onClick={() => this.props.fun()}>
                Logout
              </Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
