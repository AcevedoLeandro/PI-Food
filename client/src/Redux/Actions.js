import { GET_ALL_RECIPES, GET_RECIPES_BY_TITLE, GET_DIETS, ADD_RECIPE, FILTER_BY_DIETS, ORDER_RECIPES, GET_RECIPE_BY_DETAIL, LOADING, ERROR } from './ActionTypes'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'
// axios.defaults.baseURL = 'https://pifoodserver.up.railway.app/'

export function getAllRecipes() {
    return function (dispatch) {
        return axios.get('/recipes')
            .then(r => r.data)
            .then(data => dispatch({ type: GET_ALL_RECIPES, payload: data }))
            .catch(e => console.log(e))
    }
}

export function getRecipesByTitle(name) {
    return async function (dispatch) {
        return axios.get(`/recipes/?name=${name}`)
            .then(r => r.data)
            .then(data => dispatch({ type: GET_RECIPES_BY_TITLE, payload: data }))
            .catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export function getDiets() {
    return async function (dispatch) {
        return axios.get('/diets')
            .then(r => r.data)
            .then(data => dispatch({ type: GET_DIETS, payload: data }))
    }
}

export function getRecipeByDetail(id) {
    return async function (dispatch) {
        return axios.get(`/recipes/${id}`)
            .then(r => r.data)
            .then(data => dispatch({ type: GET_RECIPE_BY_DETAIL, payload: data }))

    }
}

export function createRecipe(payload) {

    return async function (dispatch) {
        axios.post('/recipes', payload)
            .then((r) => r.data)
            .then(data => dispatch({ type: ADD_RECIPE, payload: data }))
            .catch(e => console.log(e))

    }
}

export function filterByDiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}

export function orderRecipes(payload) {
    return {
        type: ORDER_RECIPES,
        payload
    }
}

export function loading() {
    return {
        type: LOADING
    }
}
