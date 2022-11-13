import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../../Redux/Actions'
import { useState } from "react";
import './navBar.css'
import logo from '../../Assets/logonuevo.png'
import lupa from '../../Assets/lupa.png'
export default function NavBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  function handleOnChange(e) {
    setSearch(e.target.value)
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByTitle(search));
    setSearch('');
  };

  return (
    <nav >
      <div className="navBar">
        <div>
          <a href="/home"><img src={logo} alt="logo" width="150px" /></a>
        </div>
        <div className="searchAndCreate">
          <div className="search">
            <input type="text" value={search} placeholder='Search...' onChange={e => handleOnChange(e)}></input>
            <button type='Submit' onClick={e => handleOnSubmit(e)}><img src={lupa} /></button>
          </div>
          <div>
            <Link to={"/home/createRecipe"}>
              <h3>Create yor Recipe</h3>
            </Link>
          </div>
        </div>
      </div>


    </nav>

  );
}
