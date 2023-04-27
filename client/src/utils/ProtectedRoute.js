import jwtDecode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, isAdminRoute, ...rest }) => {
  const { role } = jwtDecode(localStorage.getItem("token"));
  console.log(role);
  console.log(
    (localStorage.getItem("token") && isAdminRoute && role === "admin") ||
      !isAdminRoute
  );
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (localStorage.getItem("token") && isAdminRoute && role === "admin") ||
          !isAdminRoute
        ) {
          return children;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
