import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";

export default function LoginNav({ msg }) {
  return (
    <Navbar style={{ backgroundColor: "#242526" }} expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem
          style={{
            color: "white",
            padding: "20px",
            fontSize: "20px",
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Home
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
