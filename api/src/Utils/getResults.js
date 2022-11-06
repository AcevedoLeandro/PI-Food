const { Recipe } = require('../db.js')
const { Diet } = require('../db.js')
module.exports = async function getResults(data) {
    let resultRecipes = [];

    data.results.map((r) => {
        resultRecipes.push({
            id: r.id,
            title: r.title,
            img: r.image,
            dishType: r.dishTypes,
            diets: r.diets,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps.map((e) => e.step) : [],
        });
    });

    let resultDb = await Recipe.findAll({
        include: {
            model: Diet,
        }
    });
    return [...resultRecipes, ...resultDb];
}

