import './App.css';
import { Route, Switch } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Home from './Home.js'
import Page404 from './Components/Page404/Page404';

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
        <Route path='*'> <Page404 /></Route>
      </Switch>
    </div>
  );
}

export default App;
