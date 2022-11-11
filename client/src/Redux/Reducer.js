import { GET_ALL_RECIPES, GET_RECIPES_BY_TITLE, GET_DIETS, ADD_RECIPE, FILTER_BY_DIETS } from './ActionTypes'
const initialState = {
    recipes: [],
    filteredRecipes: [],
    diets: [],
    loading: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload
            }
        case GET_RECIPES_BY_TITLE:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case ADD_RECIPE:
            return {
                ...state,
                payload: action.payload
            }
        case FILTER_BY_DIETS:
            const recipes = state.recipes
            const filteredRecipes = action.payload === 'All' ? recipes : recipes.filter(rec => rec.diets ? rec.diets.includes(action.payload) : false)
            return {
                ...state,
                filteredRecipes
            }

        default:
            return state
    }

}