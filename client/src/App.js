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
          <Route exact path="/doctors/add">
            <DoctorNav>
              <AddDoctor />
            </DoctorNav>
          </Route>
          <Route path="/admin/profile">
            <AdminProfile />
          </Route>
          <Route exact path="/patients">
            <PatientNav>
              <Patients />
            </PatientNav>
          </Route>
          <Route exact path="/addPatient">
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
        </Switch>
        <Footer />
      </Provider>
    </ErrorBoundary>
  );
}
export default App;
