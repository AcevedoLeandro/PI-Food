import React from "react";

function Recipe(props) {

  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.healthScore}</p>
      <img src={`${props.img}`} alt="img" />
      <ul>
        {props.dishType.map((d, index) =>
          <li key={index}>{d}</li>
        )}
      </ul>
    </div>
  );
}

export default Recipe;