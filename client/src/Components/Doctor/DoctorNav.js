import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const DoctorNav = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink active={location.pathname === "/doctors/add"}>
            <Link to="/doctors/add">Add Doctor</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === "/doctors/"}>
            <Link to="/doctors/">Doctor List</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <div>{children}</div>
    </>
  );
};
export default DoctorNav;
