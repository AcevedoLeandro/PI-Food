import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../../Redux/Actions'
import { useState } from "react";

export default function NavBar() {
  var dispatch = useDispatch();

  const [input, setInput] = useState('');


  function handleOnChange(e) {
    setInput(e.target.value)
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByTitle(input));
    setInput('');
  };

  return (
    <div>
      <div>Logo</div>
      <div>
        <Link to={"/home"}>
          <h1>FUUD</h1>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to={"/home/createRecipe"}>
              <h3>Create yor Recipe</h3>
            </Link>
          </li>

          <li>

            <input type="text" value={input} placeholder='Search...' onChange={e => handleOnChange(e)}></input>
            <button type='Submit' onClick={e => handleOnSubmit(e)}>Search</button>

          </li>
        </ul>
      </div>
    </div>
  );
}
