import jwtDecode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAdminRoute, ...rest }) => {
  const { role } = jwtDecode(localStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (localStorage.getItem("token") && isAdminRoute && role === "admin") ||
          !isAdminRoute
        ) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
