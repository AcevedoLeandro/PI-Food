const { Router } = require('express');
const { Diet } = require('../db.js')
const diets = Router();

diets.get('/', async (req, res) => {

    try {
        const allDiets = await Diet.findAll({
            attributes: ['name']
        });

        res.json(allDiets);

    } catch (error) {
        res.status(404).send(error)
    }

});



module.exports = diets;