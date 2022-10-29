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
        let filteredRecipeList = [];

        let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=100&addRecipeInformation=true`);

        let recipeList = data.results.filter(r => r.title.toLowerCase().includes(name.toLowerCase()))

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
                    [Op.iLike]: `%${name}%`
                }
            },
            include: {
                model: Diet,
            }
        })
        let resultFilteredREcipe = [...filteredRecipeList, ...filteredRecipeDb]

        if (resultFilteredREcipe.length != 0)
            res.json(resultFilteredREcipe)
        else
            res.status(404).send(`No se encontraron recetas que contengan la palabra "${name}"`)

    }
    catch (error) {
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
                dishType: data.dishTypes,
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