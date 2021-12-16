import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddDepartmentForm from '../Department/addDepartment';
import GetDepartment from '../Department/getDepartment';
import FeedBack from '../Feedback';
import Header from '../header';
import Patients from '../Patient/Patients';
import AddDoctorForm from './AddDoctor';
import GetDoctor from './GetDoctors';
import NavBar from './Navbar';
import Profile from './Profile';
function AdminHomePage() {
  const name = useSelector((state) => state.login.name);
  const { pagename } = useParams();
  const getPage = () => {
    switch (pagename) {
      case 'addDepartment':
        return <AddDepartmentForm />;
      case 'getDepartment':
        return <GetDepartment />;
      case 'profile':
        return <Profile />;
      case 'feedback':
        return <FeedBack />;
      case 'patients':
        return <Patients />;
      case 'addDoctor':
        return <AddDoctorForm />;
      case 'getDoctors':
        return <GetDoctor />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return (
    <div>
      <NavBar />
      <Header msg={name} />
      {getPage()}
    </div>
  );
}
export default AdminHomePage;
