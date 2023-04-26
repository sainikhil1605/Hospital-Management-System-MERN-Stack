import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const PatientNav = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink active={location.pathname === "/addPatient"}>
            <Link to="/addPatient">Add Patient</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === "/patients"}>
            <Link to="/patients">Patient List</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <div>{children}</div>
    </>
  );
};
export default PatientNav;
