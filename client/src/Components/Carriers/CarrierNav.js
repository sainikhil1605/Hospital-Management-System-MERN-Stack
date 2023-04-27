import jwtDecode from "jwt-decode";
import { AiOutlineOrderedList } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
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
                <Link to="/carriers/add">
                  <GrAddCircle
                    style={{ marginRight: "5px", marginBottom: "2px" }}
                  />
                  Add Carrier
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={location.pathname === "/carriers"}>
                <Link to="/carriers/">
                  <AiOutlineOrderedList
                    style={{ marginRight: "5px", marginBottom: "2px" }}
                  />
                  Carriers List
                </Link>
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
