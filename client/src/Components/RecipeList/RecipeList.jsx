import React, { useEffect, useRef } from "react";
import Recipe from "../Recipe/Recipe.jsx";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiets, getAllRecipes, getDiets, loading, orderRecipes } from '../../Redux/Actions'
import { useState } from "react";
import Paginado from "../Paginado/Paginado.jsx";
import './recipeList.css'

export default function RecipeList() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading())
    dispatch(getDiets())
    dispatch(getAllRecipes());
  }, [dispatch]);
  const load = useSelector(state => state.loading)
  const order = useRef(null)
  const stateDiets = useSelector((state) => state.diets)
  const allrecipes = useSelector((state) => state.filteredRecipes)
  const [currentPage, setCurrentPage] = useState(1)
  const cantRecipePerPage = useRef(9).current
  const lastRecipe = currentPage * cantRecipePerPage
  const firstRecipe = lastRecipe - cantRecipePerPage
  const currentRecipes = allrecipes.slice(firstRecipe, lastRecipe)
  const [refresh, setRefresh] = useState('')
  const pages = function (pageNumber) {
    setCurrentPage(pageNumber)
  }

  function handleFilterSelect(e) {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value))
    setCurrentPage(1)
    order.current.value = 'Select'
  }

  function handleOrderSelect(e) {
    e.preventDefault();
    dispatch(orderRecipes(e.target.value))
    setRefresh(e.target.value)
  }
  return (
    <>
      <div className="div.select">
        <div className='filterMenu'>
          <div className="dietFilter">
            <select onChange={handleFilterSelect}>
              <option defaultValue='all'>All</option>
              {stateDiets?.map((d, index) =>
                <option key={index} value={d.name}>{d.name}</option>
              )}
            </select>
          </div>
          <div>
            <select ref={order} onChange={handleOrderSelect}>
              <option value='Select'>Select..</option>
              <option value='Asc'>A-z</option>
              <option value='Desc'>Z-a</option>
              <option value='HS'>Health Score</option>
            </select>
          </div>
        </div>
      </div>
      {!load ?
        <div>
          <div>
            <Paginado cantAllRecipes={allrecipes.length} cantRecipePerPage={cantRecipePerPage} pages={pages} />
          </div>
          <div className='recipeListConteiner'>
            {
              currentRecipes?.map(r =>
                <Recipe
                  key={r.id}
                  id={r.id}
                  title={r.title}
                  img={r.img}
                  healthScore={r.healthScore}
                  dishTypes={r.dishTypes}
                  diets={r.diets}
                />
              )
            }
          </div>
        </div>
        :
        <div>
          <h3>LOADING...</h3>
        </div>
      }
    </>
  );
}