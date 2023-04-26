import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const RoomNav = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink active={location.pathname === "/rooms/add"}>
            <Link to="/rooms/add">Add Room</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === "/rooms"}>
            <Link to="/rooms/">Room List</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <div>{children}</div>
    </>
  );
};
export default RoomNav;
