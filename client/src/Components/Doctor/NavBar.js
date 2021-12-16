import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

function NavBar() {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink active>
          <Link to="/doctor/appointments">View Appointments</Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <Link to="/doctorLogin/editDocProfile">Edit Profile</Link>
        </NavLink>
      </NavItem>
    </Nav>
  );
}
export default NavBar;
