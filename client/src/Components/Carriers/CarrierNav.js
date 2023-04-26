import jwtDecode from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const CarrierNav = ({ children }) => {
  const location = useLocation();
  const { role } = jwtDecode(localStorage.getItem("token"));
  return (
    <>
      {role === "admin" && (
        <>
          <Nav tabs>
            <NavItem>
              <NavLink active={location.pathname === "/carriers/add"}>
                <Link to="/carriers/add">Add Carrier</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={location.pathname === "/carriers"}>
                <Link to="/carriers/">Carriers List</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </>
      )}
      <div>{children}</div>
    </>
  );
};
export default CarrierNav;
