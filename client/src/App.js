import './App.css';
import { Route, Switch } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Home from './Home.js'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
