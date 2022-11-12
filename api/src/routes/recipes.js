const { Router } = require('express');
const recipes = Router()
const { Recipe, Diet } = require('../db.js')
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const getResultsByName = require('../Utils/getResultsByName');
const getResults = require('../Utils/getResults');

recipes.get('/', async (req, res) => {
    try {
        let { name } = req.query;
        let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=9&addRecipeInformation=true`);

        if (!name) {
            let results = await getResults(data)
            res.json(results)
        }
        else {
            let resultByName = await getResultsByName(data, name)
            if (resultByName.length != 0)
                res.json(resultByName)
            else
                res.status(404).send(`No se encontraron recetas que contengan la palabra "${name}"`)
        }

    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

});

recipes.get('/:id', async (req, res) => {
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    try {
        let { id } = req.params;
        if (!id) return res.status(400).send('Error: ID must not be null')

        if (v4.test(id)) {
            const recipeDetailDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                }
            });

            recipeDetailDb ? res.json(recipeDetailDb) : res.status(404).send(`No se encontro la receta con ID: ${id} `)
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

        const { title, summary, healthScore, steps, img, diets, dishTypes } = req.body;

        if (!title || !img || !summary || !diets || !dishTypes || !steps || !healthScore) { return res.status(400).send(`Faltan datos por ingresar`) }

        let newRecipe = {
            title,
            img,
            dishTypes,
            diets,
            summary,
            healthScore,
            steps
        }

        const recipeCreate = await Recipe.create(newRecipe);

        diets.map(async d => {
            const newDiet = await Diet.findOrCreate({
                where: { name: d.toLowerCase() }
            });
            recipeCreate.addDiet(newDiet[0])

        });
        res.send('Objeto creado Correctamente.')


    } catch (error) {
        res.status(400).send(error)
    }




});

module.exports = recipes;


// axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`)
//     .then((response) => res.send(response.data))
//     .catch(e => console.log(e))