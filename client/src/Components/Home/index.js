import React from "react";
import admin from "../../assets/admin.png";
import patient from "../../assets/patient.jpg";
import doctor from "../../assets/doctor_new.png";
import Card from "./Cards";
import { HomeBody, HomeContainer, HomeItem } from "./Home.styles";
function Home() {
  return (
    <>
      <HomeContainer style={{}}>
        <HomeItem
          style={{
            flex: "1",
            position: "absolute",
            color: "white",
          }}
        >
          Global Hospitals
        </HomeItem>
        <HomeItem
          style={{
            paddingTop: "10px",
            flex: "1",
            textAlign: "right",
          }}
        ></HomeItem>
      </HomeContainer>
      <HomeBody>
        <Card role="admin" src={admin} link="/adminLogin" />
        <Card role="doctor" src={doctor} link="/doctor" />
        <Card role="patient" src={patient} link="patientLogin" />
      </HomeBody>
    </>
  );
}

export default Home;
