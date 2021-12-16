import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddDepartmentForm from '../Department/addDepartment';
import GetDepartment from '../Department/getDepartment';
import Header from '../header';
import NavBar from '../Navbar';
import GetProfile from './getProfile';
function AdminHomePage() {
  const name = useSelector((state) => state.login.name);
  const { pagename } = useParams();
  const getPage = () => {
    console.log(pagename);
    switch (pagename) {
      case 'addDepartment':
        return <AddDepartmentForm />;
      case 'getDepartment':
        return <GetDepartment />;
      case 'profile':
        return <GetProfile />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return (
    <div>
      <NavBar fun={() => this.logout()} />
      <Header msg={name} />
      {getPage()}
    </div>
  );
}
export default AdminHomePage;
