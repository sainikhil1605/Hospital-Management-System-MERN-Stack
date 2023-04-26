import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddDepartmentForm from "../Department/addDepartment";
import GetDepartment from "../Department/getDepartment";
import FeedBack from "../Feedback";
import Header from "../header";
import Patients from "../Patient/Patients";
function AdminHomePage() {
  const name = useSelector((state) => state.login.name);
  const { pagename } = useParams();
  const getPage = () => {
    switch (pagename) {
      case "addDepartment":
        return <AddDepartmentForm />;
      case "getDepartment":
        return <GetDepartment />;
      case "profile":
        return;
      case "feedback":
        return <FeedBack />;
      case "patients":
        return <Patients />;
      case "addPatient":
        return <Patients />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return (
    <div>
      <Header msg={name} />
      {getPage()}
    </div>
  );
}
export default AdminHomePage;
