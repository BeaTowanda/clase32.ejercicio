const express = require('express');
const { validationResult } = require("express-validator");
const { check,body} = require("express-validator");
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const db = require('../database/models');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recomended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);

router.get("movies/update/:id",moviesController.update)


//Rutas exigidas para la creación del CRUD
router.get('/movies/add', moviesController.add);
/*router.post('movies/add',[
    check('title').notEmpty().withMessage("Debe ingresar TITULO Completo")
    .bail()
    .custom(function(value){
        db.Movie.findOne(value)
        .then(movie => { 
            let encontrada = movie} )
        if(encontrada){
            throw new Error ("Película ya está en la base")
        }
        return true } ) , 


    check('rating').notEmpty().withMessage('Debe ingresar Rating'),
 
    check('awards').notEmpty().withMessage("Los awards debe estar completo"),
 
    check('realese_date').notEmpty().withMessage("Los awards debe estar completo"),
       
],moviesController.create);*/

router.post("movies/altaPeli",moviesController.altaPeli)

//
//router.???('', moviesController.edit);
//router.???('', moviesController.update);
//router.???('', moviesController.delete);
//router.???('', moviesController.destroy); */

module.exports = router;