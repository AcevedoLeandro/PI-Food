import React, { useEffect } from "react";
import Recipe from "../Recipe/Recipe.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets } from '../../Redux/Actions'


export default function RecipeList() {

  let dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes)

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets())
  }, [dispatch]);


  return (
    <div>
      {console.log(recipes)}
      <ul>
        {
          recipes?.map(r =>
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
      </ul>
    </div>
  );
}