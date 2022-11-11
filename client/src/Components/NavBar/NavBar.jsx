import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../Redux/Actions'
import { useState } from "react";
import './navBar.css'


export default function NavBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getDiets())
  }, [])

  const stateDiets = useSelector((state) => state.diets)

  function handleOnChange(e) {
    setSearch(e.target.value)
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByTitle(search));
    setSearch('');
  };

  function handleFilterSelect(e) {
    e.preventDefault();
    console.log(e.target.value)
    dispatch(actions.filterByDiets(e.target.value))

  }

  return (
    <nav >
      <div className="navBar">
        <div>
          <a href="/home"><img src="logo.png" alt="logo" width="200px" /></a>
        </div>
        <div className="searchAndCreate">
          <input type="text" value={search} placeholder='Search...' onChange={e => handleOnChange(e)}></input>
          <button type='Submit' onClick={e => handleOnSubmit(e)}>Search</button>
          <Link to={"/home/createRecipe"}>
            <h3>Create yor Recipe</h3>
          </Link>
        </div>
      </div>

      <div className='filterMenu'>

        <select onChange={handleFilterSelect}>
          <option defaultValue='all'>All</option>
          {stateDiets.map((d, index) =>
            <option key={index} value={d.name}>{d.name}</option>
          )}
        </select>

        <select>
          <option value='asc'>A-z</option>
          <option value='desc'>Z-a</option>
          <option value='hs'>Health Score</option>
        </select>
      </div>
    </nav>
  );
}
