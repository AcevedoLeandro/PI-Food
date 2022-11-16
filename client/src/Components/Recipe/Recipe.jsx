import React from "react";
import { Link } from "react-router-dom";
import './recipe.css'

function Recipe(props) {

  return (
    <div className="recipe">
      <h4>{props.title}</h4>
      <Link to={`/home/detail/${props.id}`} ><img src={`${props.img}`} alt="img" /></Link>

      <div className="dishTypes">
        <p>DISH TYPES</p>
        <ul>
          {props.dishTypes.map((d, index) =>
            <li key={index}>{d}</li>
          )}
        </ul>
      </div>

      <div className="diets">
        <p>DIETS</p>
        <ul>
          {props.diets.map((e, index) =>
            <li key={index}>{e}</li>
          )}
        </ul>
      </div>
      <h3>{props.healthScore}</h3>
    </div>
  );
}

export default Recipe;