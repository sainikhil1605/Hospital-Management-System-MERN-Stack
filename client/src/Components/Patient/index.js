import Cookies from 'js-cookie';
import React from 'react';
import { useParams } from 'react-router-dom';
import GetDoctor from '../Admin/GetDoctors';
import Header from '../header';
import Profile from './Profile';
import SecNavBar from './secNavBar';
function PatientHomePage() {
  const { pagename } = useParams();
  console.log(pagename);
  const getPage = () => {
    switch (pagename) {
      case 'doctors':
        return <GetDoctor />;
      case 'profile':
        return <Profile />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return (
    <div>
      <SecNavBar data="patientData" name="patientName" link="/patientLogin" />
      <Header msg={Cookies.get('patientName')} />
      {getPage()}
    </div>
  );
}
export default PatientHomePage;
