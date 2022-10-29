const { Router } = require('express');
const { Recipe, Diet, RecipeDiet } = require('../db.js')
const { Op } = require('sequelize');  // para usar en querys
const recipes = Router()
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

recipes.get('/', async (req, res) => {
    try {
        let { name } = req.query;
        if (!name) return res.status(400).send('No recibo title.')
        let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=100&addRecipeInformation=true`); //&addRecipeInformation=true

        let recipeList = data.results.filter(r => r.title.toLowerCase().includes(name.toLowerCase()))
        let filteredRecipeList = [];
        recipeList.map(r => {
            filteredRecipeList.push({
                id: r.id,
                title: r.title,
                img: r.image,
                dishType: r.dishTypes,
                diets: r.diets,
                summary: r.summary,
                healthScore: r.healthScore,
                steps: r.analyzedInstructions[0].steps.map(e => e.step)
            })

        })

        let filteredRecipeDb = await Recipe.findAll({
            where: {
                title: {
                    [Op.substring]: `%${name}%`
                }
            },
            include: {
                model: Diet,
            }
        })

        res.json([...filteredRecipeList, ...filteredRecipeDb])
    }
    catch (error) {
        res.status(404).send({ error: error.message, code: error.code })
    }

});

recipes.get('/:id', async (req, res) => {
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    try {
        let { id } = req.params;
        if (!id) return res.status(400).send('No recibo id.')

        if (v4.test(id)) {
            const recipeDetailDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                }
            });

            res.json(recipeDetailDb)
        }
        else {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`);

            let recipeDetail = {
                id: data.id,
                title: data.title,
                img: data.image,
                dishType: data.dishTypes,
                diets: data.diets,
                summary: data.summary,
                healthScore: data.healthScore,
                steps: data.analyzedInstructions[0].steps.map(e => e.step)
            }

            res.json(recipeDetail)
        }
    } catch (error) {
        res.status(404).send({ error: error.message, code: error.code })
    };

});

recipes.post('/', async (req, res) => {

    try {

        const { title, summary, healthScore, steps, img, diets, dishTypes } = req.body;

        if (!title || !summary || !healthScore || !steps || !img || !diets || !dishTypes) { res.status(400).send(`faltan datos por ingresar`) }
        else {
            let newRecipe = {
                title: title.toLowerCase(),
                img,
                dishTypes,
                diets,
                summary: summary.toLowerCase(),
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
            res.send('Objeto creado.')
        }

    } catch (error) {
        res.status(400).send(console.log(error))
    }




});

module.exports = recipes;


// axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`)
//     .then((response) => res.send(response.data))
//     .catch(e => console.log(e))