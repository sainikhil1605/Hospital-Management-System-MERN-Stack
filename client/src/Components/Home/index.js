import React from 'react';
import { Link } from 'react-router-dom';
import admin from '../../assets/admin.png';
import doctor from '../../assets/doctor_new.png';
import patient from '../../assets/patient.jpg';
import Card from './Cards';
import { HomeBody, HomeContainer, HomeItem } from './Home.styles';
function Home() {
  return (
    <>
      <HomeContainer style={{}}>
        <HomeItem
          style={{
            paddingTop: '10px',
            flex: '1',
            position: 'absolute',
            color: 'white',
          }}
        >
          Global Hospitals
        </HomeItem>
        <HomeItem
          style={{
            paddingTop: '10px',
            flex: '1',
            textAlign: 'right',
          }}
        >
          <Link style={{ color: 'white' }} to="/signUp">
            New User? Sign Up!!
          </Link>
        </HomeItem>
      </HomeContainer>
      <HomeBody>
        <Card role="admin" src={admin} link="/adminLogin" />
        <Card role="doctor" src={doctor} link="/doctorLogin" />
        <Card role="patient" src={patient} link="patientLogin" />
      </HomeBody>
    </>
  );
}

export default Home;
