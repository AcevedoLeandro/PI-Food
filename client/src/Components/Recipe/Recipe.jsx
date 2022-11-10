import React from "react";

function Recipe(props) {

  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.healthScore}</p>
      <img src={`${props.img}`} alt="img" />
      <div>
        <p>DISH TYPES</p>
        <ul>
          {props.dishTypes.map((d, index) =>
            <li key={index}>{d}</li>
          )}
        </ul>
      </div>
      <div>
        <p>DIETS</p>
        <ul>
          {props.diets.map((e, index) =>
            <li key={index}>{e}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Recipe;