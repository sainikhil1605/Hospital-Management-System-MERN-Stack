import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

import { AiOutlineOrderedList } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import jwtDecode from "jwt-decode";
const PatientNav = ({ children }) => {
  const location = useLocation();
  const { role } = jwtDecode(localStorage.getItem("token"));
  return (
    <>
      <Nav tabs>
        {role !== "doctor" && (
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
        )}

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
        {/* {role === "doctor" && (
          <NavItem>
            <NavLink active={location.pathname === "/doctor/previousPatients"}>
              <Link to="/doctor/previousPatients">
                <AiOutlineOrderedList
                  style={{ marginRight: "5px", marginBottom: "2px" }}
                />
                Previous Patients
              </Link>
            </NavLink>
          </NavItem>
        )} */}
      </Nav>
      <div>{children}</div>
    </>
  );
};
export default PatientNav;
