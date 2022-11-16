const { Router } = require('express');
const recipes = Router()
const { Recipe, Diet } = require('../db.js')
const axios = require('axios');
const { Op } = require('sequelize');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const imgDefault = 'https://cdn-icons-png.flaticon.com/512/85/85488.png'

async function getDataApi(name) {
    let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=4&addRecipeInformation=true`);
    var apiResult
    let resultRecipes = []

    if (name) {
        apiResult = data.results.filter((r) => r.title.toLowerCase().includes(name.toLowerCase()));
    }
    else { apiResult = data.results }

    apiResult.map((r) => {
        resultRecipes.push({
            id: r.id,
            title: r.title,
            img: r.image,
            dishTypes: r.dishTypes,
            diets: r.diets,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps.map((e) => e.step) : [],
        });
    });
    return [...resultRecipes]
}

async function getDataDB(name) {
    var resultDb
    let resultRecipes = []
    if (name) {
        resultDb = await Recipe.findAll({
            where: {
                title: { [Op.iLike]: `%${name}%` }
            },
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
    }
    else {
        resultDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
    }

    resultDb.map(r => {
        resultRecipes.push({
            id: r.id,
            title: r.title,
            img: r.img,
            dishTypes: r.dishTypes,
            diets: r.diets.map(e => e.name),
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.steps
        })
    })
    return [...resultRecipes]
}


recipes.get('/', async (req, res) => {

    try {

        let { name } = req.query;
        let responseApi = await getDataApi(name)
        let responseDB = await getDataDB(name)
        let response = [...responseApi, ...responseDB]
        if (response.length > 0)
            res.json(response)
        else
            res.status(404).send('no se encontraron recetas con ese nombre')
    }
    catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

});

recipes.get('/:id', async (req, res) => {
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    try {

        let { id } = req.params;
        if (!id) return res.status(400).send('Error: ID must not be null')

        if (v4.test(id)) {
            const DetailDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });

            let resultDb = {
                id: DetailDb.id,
                title: DetailDb.title,
                img: DetailDb.img,
                dishTypes: DetailDb.dishTypes,
                summary: DetailDb.summary,
                healthScore: DetailDb.healthScore,
                diets: DetailDb.diets.map(e => e.name),
                steps: DetailDb.steps
            }

            DetailDb ? res.json(resultDb) : res.status(404).send(`No se encontro la receta con ID: ${id} `)
        }
        else {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`);

            let recipeDetail = {
                id: data.id,
                title: data.title,
                img: data.image,
                dishTypes: data.dishTypes,
                diets: data.diets,
                summary: data.summary,
                healthScore: data.healthScore,
                steps: data.analyzedInstructions.length != 0 ? data.analyzedInstructions[0].steps.map(e => e.step) : [] //algunas recetas no traen paso a paso
            }

            return res.json(recipeDetail)
        }
    } catch (error) {
        res.status(404).send(error)
    };

});

recipes.post('/', async (req, res) => {

    try {

        const { title, summary, healthScore, steps, img, dishTypes, diets } = req.body;
        if (!title || !summary || !steps || !healthScore) { return res.status(400).send(`Faltan datos por ingresar`) }

        let newRecipe = {
            title,
            img: img ? img : imgDefault,
            dishTypes: dishTypes ? dishTypes : [],
            diets: diets ? diets : [],
            summary,
            healthScore,
            steps
        }

        const recipeCreate = await Recipe.create(newRecipe);

        diets && diets.map(async d => {
            const newDiet = await Diet.findOrCreate({
                where: { name: d.toLowerCase() }
            });
            recipeCreate.addDiet(newDiet[0])

        });
        let { id } = recipeCreate

        res.json(id)

    } catch (error) {
        res.status(400).send(error)
    }




});

module.exports = recipes;


// axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`)
//     .then((response) => res.send(response.data))
//     .catch(e => console.log(e))