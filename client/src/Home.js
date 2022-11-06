import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar.jsx";
import CreateRecipe from './Components/CreateRecipe/CreateRecipe.jsx'
import RecipeList from "./Components/RecipeList/RecipeList.jsx";



export default function Home() {

    return (
        <>
            <Navbar />
            <Route exact path='/home'>
                <RecipeList />
            </Route>
            <Route exact path='/home/createrecipe'>
                <CreateRecipe />
            </Route>
        </>
    );
}

