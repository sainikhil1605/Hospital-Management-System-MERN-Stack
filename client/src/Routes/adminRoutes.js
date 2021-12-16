import Cookies from 'js-cookie';
import { Route, Switch } from 'react-router';
import AddDoctorForm from '../Components/Admin/AddDoctor';
import GetDoctor from '../Components/Admin/GetDoctors';
import GetProfile from '../Components/Admin/Profile';
import AddDepartmentForm from '../Components/Department/addDepartment';
import GetDepartment from '../Components/Department/getDepartment';
import GetFeedBack from '../Components/Feedback';
import AddPatientForm from '../Components/Patient/addPatient';
import GetPatient from '../Components/Patient/Patients';
export default function AdminRoutes() {
  return (
    <Switch>
      <Route exact path="/adminLogin">
        <AddDepartmentForm />
      </Route>
      <Route exact path="/adminLogin/deplist">
        <GetDepartment />
      </Route>
      <Route exact path="/adminLogin/doctorList">
        <GetDoctor />
      </Route>
      <Route exact path="/adminLogin/addDoctor">
        <AddDoctorForm />
      </Route>
      <Route exact path="/adminLogin/patientList">
        <GetPatient />
      </Route>
      <Route exact path="/adminLogin/addPatient">
        <AddPatientForm />
      </Route>
      <Route exact path="/adminLogin/getFeedback">
        <GetFeedBack />
      </Route>
      <Route exact path="/adminLogin/getProfile">
        <GetProfile id={Cookies.get('user_id')} />
      </Route>
      <Route>
        <h1>Error 404!! Page Not Found</h1>
      </Route>
    </Switch>
  );
}
