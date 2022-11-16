import { GET_ALL_RECIPES, GET_RECIPES_BY_TITLE, GET_DIETS, ADD_RECIPE, FILTER_BY_DIETS, ORDER_RECIPES, GET_RECIPE_BY_DETAIL, LOADING, ERROR } from './ActionTypes'
const initialState = {
    recipes: [],
    filteredRecipes: [],
    diets: [],
    recipeDetail: [],
    loading: false,
    error: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload,
                loading: false
            }
        case GET_RECIPES_BY_TITLE:
            return {
                ...state,
                filteredRecipes: action.payload,
                loading: false
            }
        case GET_RECIPE_BY_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
                loading: false
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
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

        case ORDER_RECIPES:
            var orderedRecipes = []
            if (action.payload === 'Asc') {
                orderedRecipes = state.filteredRecipes.sort((a, b) => {
                    if (a.title > b.title) return 1
                    if (b.title > a.title) return -1
                    return 0;
                })
            }
            if (action.payload === 'Desc') {
                orderedRecipes = state.filteredRecipes.sort((a, b) => {
                    if (a.title > b.title) return -1
                    if (b.title > a.title) return 1
                    return 0
                })
            }
            if (action.payload === 'HS') {

                orderedRecipes = state.filteredRecipes.sort((a, b) => {
                    if (parseInt(a.healthScore) > parseInt(b.healthScore)) return 1
                    if (parseInt(a.healthScore) < parseInt(b.healthScore)) return -1
                    return 0
                })
            }
            if (action.payload === 'Select') {
                orderedRecipes = state.filteredRecipes
            }
            return {
                ...state,
                filteredRecipes: orderedRecipes
            }

        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state
    }

}