import { GET_ALL_RECIPES, GET_RECIPES_BY_TITLE, GET_DIETS, ADD_RECIPE } from './ActionTypes'

const initialState = {
    recipes: [],
    diets: [],
    loading: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPES_BY_TITLE:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case ADD_RECIPE:
            return {
                payload: action.payload
            }

        default:
            return state
    }

}