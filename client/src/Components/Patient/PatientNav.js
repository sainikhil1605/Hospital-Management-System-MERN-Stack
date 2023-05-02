import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

import { AiOutlineOrderedList } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
const PatientNav = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink active={location.pathname === "/patients/add"}>
            <Link to="/patients/add">
              <GrAddCircle
                style={{ marginRight: "5px", marginBottom: "2px" }}
              />
              Add Patient
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === "/patients"}>
            <Link to="/patients">
              <AiOutlineOrderedList
                style={{ marginRight: "5px", marginBottom: "2px" }}
              />
              Patient List
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
      <div>{children}</div>
    </>
  );
};
export default PatientNav;
