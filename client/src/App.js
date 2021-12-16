import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AdminHomePage from './Components/Admin/AdminHomePage';
import ErrorBoundary from './Components/ErrorBoundary';
import Home from './Components/Home';
import LogIn from './Components/Login';
import PureFooter from './Components/PureFooter';
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
        </Switch>
        <PureFooter />
      </Provider>
    </ErrorBoundary>
  );
}
export default App;
