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
router.get ("/movies/update/:id",moviesController.edit)
router.post("/movies/update/:id",[
    check('title').notEmpty().withMessage("Debe ingresar TITULO Completo")
    .bail(),
    check('rating').notEmpty().withMessage('Debe ingresar Rating'),
 
    check('awards').notEmpty().withMessage("Los awards debe estar completo")
 
   // check('realese_date').notEmpty().withMessage("Los awards debe estar completo"),
],moviesController.update);

//Rutas exigidas para la creación del CRUD
router.get('/movies/add', moviesController.add);
router.post('/movies/altaPeli',[    
    check('title').notEmpty().withMessage("Debe ingresar TITULO Completo")
    .bail(),
    check('rating').notEmpty().withMessage('Debe ingresar Rating'),
 
    check('awards').notEmpty().withMessage("Los awards debe estar completo")
 
   // check('realese_date').notEmpty().withMessage("Los awards debe estar completo"),       
   /* .custom(function(value){
        db.Movie.findOne(value)
        .then(movie => { 
            let encontrada = movie} )
        if(encontrada){
            throw new Error ("Película ya está en la base")
        }
        return true } ) , */  
   // check('realese_date').notEmpty().withMessage("Los awards debe estar completo"),
       
],moviesController.altaPeli);



//
//router.???('', moviesController.edit);
//router.???('', moviesController.update);
router.get('/movies/delete/:id', moviesController.delete);
router.post('/movies/destroy/:id', moviesController.destroy);

module.exports = router;