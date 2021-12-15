import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import LogIn from './Components/Login';
import PureFooter from './Components/PureFooter';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        {/* <Route path="/signUp">
          <LoginNav msg="signup" />
          <Row mt="7">
            <LoginCard src={doctor_login} msg="Welcome to Global Hospitals" />
            <Col>
              <h1>Sign Up</h1>
              <SignUp />
            </Col>
          </Row>
        </Route> */}
      </Switch>
      <PureFooter />
    </div>
  );
}
export default App;
