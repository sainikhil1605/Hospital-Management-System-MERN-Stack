import { AiOutlineOrderedList } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const RoomNav = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink active={location.pathname === "/rooms/add"}>
            <Link to="/rooms/add">
              <GrAddCircle
                style={{ marginRight: "5px", marginBottom: "2px" }}
              />
              Add Room
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === "/rooms"}>
            <Link to="/rooms/">
              <AiOutlineOrderedList
                style={{ marginRight: "5px", marginBottom: "2px" }}
              />
              Room List
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
      <div>{children}</div>
    </>
  );
};
export default RoomNav;
