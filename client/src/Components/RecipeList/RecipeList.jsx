import React, { useEffect, useRef } from "react";
import Recipe from "../Recipe/Recipe.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from '../../Redux/Actions'
import { useState } from "react";
import Paginado from "../Paginado/Paginado.jsx";
import './recipeList.css'

export default function RecipeList() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  const allrecipes = useSelector((state) => state.filteredRecipes)
  const [currentPage, setCurrentPage] = useState(1)
  const cantRecipePerPage = useRef(9).current
  const lastRecipe = currentPage * cantRecipePerPage
  const firstRecipe = lastRecipe - cantRecipePerPage
  const currentRecipes = allrecipes.slice(firstRecipe, lastRecipe)

  const pages = function (pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div>
        <Paginado cantAllRecipes={allrecipes.length} cantRecipePerPage={cantRecipePerPage} pages={pages} />
      </div>
      <div className='recipeListConteiner'>
        {
          currentRecipes?.map(r =>
            <Recipe
              key={r.id}
              title={r.title}
              img={r.img}
              healthScore={r.healthScore}
              dishTypes={r.dishTypes}
              diets={r.diets}
            />
          )
        }

      </div>
    </>

  );
}