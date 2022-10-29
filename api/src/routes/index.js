const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const recipes = require('./recipes.js')
const diets = require('./diets.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', diets)
router.use('/recipes', recipes)
router.use('*', (req, res) => {
    res.send('PAGE 404')
})
module.exports = router;
