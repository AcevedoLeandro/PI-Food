import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Home from './Home.js'

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </div>
  );
}

export default App;
