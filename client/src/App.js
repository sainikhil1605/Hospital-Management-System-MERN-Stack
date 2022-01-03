import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AdminHomePage from './Components/Admin/AdminHomePage';
import Appointments from './Components/Doctor/Appointments';
import ErrorBoundary from './Components/ErrorBoundary';
import Footer from './Components/Footer';
import Home from './Components/Home';
import LogIn from './Components/Login';
import PatientHomePage from './Components/Patient';
import store from './utils/Redux/store';
function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/admin/:pagename">
            <AdminHomePage />
          </Route>
          <Route path="/doctor/appoinments">
            <Appointments />
          </Route>
          <Route path="/patient/:pagename">
            <PatientHomePage />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </ErrorBoundary>
  );
}
export default App;
