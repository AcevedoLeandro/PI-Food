import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Assets/logonuevo.png'
import './landingPage.css'
export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Welcome to</h1>
      <img src={logo} alt='Logo'></img>
      <h2>
        Can't decide WHAT to cook or HOW to cook it?
        <br />
        We can help you....
      </h2>
      <Link to="/home"><button>Lets Go!</button></Link>
    </div>
  );
}
