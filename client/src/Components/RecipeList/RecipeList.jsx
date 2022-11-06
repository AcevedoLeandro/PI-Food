import React, { useEffect } from "react";
import Recipe from "../Recipe/Recipe.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from '../../Redux/Actions'


export default function RecipeList(props) {

  let dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes)

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);


  return (
    <div>
      <ul>
        {
          recipes && recipes.map(r =>
            <Recipe
              key={r.id}
              title={r.title}
              img={r.img}
              healthScore={r.healthScore}
              dishType={r.dishType}
            />
          )
        }
      </ul>
    </div>
  );
}


// function mapStateToProps(state) {
//   return {
//     recipes: state.recipes
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     getAllRecipes: () => dispatch(getAllRecipes()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
