import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to FUUD</h1>
      <h3>
        Can't decide WHAT to cook or HOW to cook it?
        <br />
        We can help you....
      </h3>
      <Link to="/home">Lets Go!</Link>
    </div>
  );
}
