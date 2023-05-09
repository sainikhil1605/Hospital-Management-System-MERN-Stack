import { Provider } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Admin/Navbar";
import ErrorBoundary from "./Components/ErrorBoundary";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import LogIn from "./Components/Login";
import store from "./utils/Redux/store";
import AdminProfile from "./Components/Admin/AdminProfile";
import Header from "./Components/header";

import Bills from "./Components/Bills";
import ViewBill from "./Components/Bills/ViewBill";
import Patients from "./Components/Patient/Patients";
import AddPatientForm from "./Components/Patient/addPatient";
import AddDoctor from "./Components/Doctor/AddDoctor";
import DoctorNav from "./Components/Doctor/DoctorNav";
import DoctorList from "./Components/Doctor/DoctorList";
import AddBill from "./Components/Bills/AddBill";
import PatientNav from "./Components/Patient/PatientNav";
import AdmitPatient from "./Components/Patient/AdmitPatient";
import PatientDetails from "./Components/Patient/PatientDetails";
import Profile from "./Components/Patient/Profile";
import PatientBills from "./Components/Bills/PatientBills";
import Rooms from "./Components/Rooms";
import ViewRoom from "./Components/Rooms/ViewRoom";
import Carrier from "./Components/Carriers";
import RoomNav from "./Components/Rooms/RoomNav";
import AddRoom from "./Components/Rooms/AddRoom";
import CarrierNav from "./Components/Carriers/CarrierNav";
import AddCarrier from "./Components/Carriers/AddCarrier";
import EditDoctor from "./Components/Doctor/EditDoctor";
import ProtectedRoute from "./utils/ProtectedRoute";
import EditPatientForm from "./Components/Patient/EditPatient";
import EditRoom from "./Components/Rooms/EditRoom";
import AdmittedPatients from "./Components/Patient/AdmittedPatients";
import DoctorProfile from "./Components/Doctor/Profile";
import PreviousPatients from "./Components/Doctor/PreviousPatients";
function App() {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <Provider store={store}>
        {location.pathname !== "/login" && location.pathname !== "/" && (
          <>
            <NavBar />
            <Header msg={localStorage.getItem("name")} />
          </>
        )}
        <Switch>
          <Route exact path="/bills">
            <Bills />
          </Route>
          <Route exact path="/bills/add">
            <AddBill />
          </Route>
          <Route exact path="/bills/:billId">
            <ViewBill />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route exact path="/doctors">
            <DoctorNav>
              <DoctorList />
            </DoctorNav>
          </Route>
          <Route exact path="/doctor/previousPatients">
            <PatientNav>
              <PreviousPatients />
            </PatientNav>
          </Route>
          <ProtectedRoute isAdminRoute exact path="/doctors/add">
            <DoctorNav>
              <AddDoctor />
            </DoctorNav>
          </ProtectedRoute>

          <ProtectedRoute isAdminRoute path="/admin/profile">
            <AdminProfile />
          </ProtectedRoute>
          <ProtectedRoute isAdminRoute path="/patient/edit/:id">
            <EditPatientForm />
          </ProtectedRoute>

          <Route exact path="/patients">
            <PatientNav>
              <Patients />
            </PatientNav>
          </Route>
          <Route exact path="/patients/add">
            <PatientNav>
              <AddPatientForm />
            </PatientNav>
          </Route>
          <Route exact path="/admit/:id">
            <AdmitPatient />
          </Route>
          <Route path="/patient/:id">
            <PatientDetails />
          </Route>
          <Route path="/user/profile">
            <Profile />
          </Route>
          <Route path="/user/bills">
            <PatientBills />
          </Route>
          <Route path="/rooms/add">
            <RoomNav>
              <AddRoom />
            </RoomNav>
          </Route>
          <Route path="/admittedPatients">
            <AdmittedPatients />
          </Route>
          <Route path="/rooms/edit/:id">
            <EditRoom />
          </Route>
          <Route path="/rooms/:id">
            <RoomNav>
              <ViewRoom />
            </RoomNav>
          </Route>
          <Route path="/rooms">
            <RoomNav>
              <Rooms />
            </RoomNav>
          </Route>
          <Route path="/carriers/add">
            <CarrierNav>
              <AddCarrier />
            </CarrierNav>
          </Route>
          <Route path="/carriers">
            <CarrierNav>
              <Carrier />
            </CarrierNav>
          </Route>
          <Route path="/doctor/profile">
            <DoctorProfile />
          </Route>
          <Route path="/doctor/:id">
            <EditDoctor />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </ErrorBoundary>
  );
}
export default App;
