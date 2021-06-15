import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import Home from './components/Home'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Admin from './components/Dashboards/Admin'
import Convener from './components/Dashboards/Convener'
import Member from './components/Dashboards/Member'
import User from './components/Dashboards/User'


function App() {
  return (
    <div>
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard/user" component={User} />
      <Route exact path="/dashboard/admin" component={Admin}/>
      <Route exact path="/dashboard/convener" component={Convener}/>
      <Route exact path="/dashboard/member" component={Member}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/sign-in" component={SignIn} />
    </Switch>
    </Router>
    </div>
  );
}

export default App;
