const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require("express-validator");
const { check,body} = require ("express-validator");                                                                                                                                                                                                                                       

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {                                                                                                                                                                                                                                               
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    "add": function (req, res) {         
      res.render("moviesAdd.ejs")    
    },
    "altaPeli": function (req, res) {
        console.log("esta en altaPeli")
        /*const errors = validationResult(req) ;
        if (errors.errors.length !== 0){
            res.render ("moviesAdd",{errors: errors.mapped(errors)}) }      
        else {*/
            db.Movie.create ({
            title : req.body.title,
            rating :req.body.rating,
            length : req.body.length,
            awards : req.body.awards,
            realese_date: req.body.realese_date 
          } )
          .then(movies => {
            res.render('moviesList.ejs', { movies });
        }, ) 
    },     
    "edit": function(req,res) {
        res.render("moviesUpdate.ejs",{id})
    },      
    "update": function(req,res) {
        
        // TODO
    },
    //delete: function (req, res) {
        // TODO
    //},
    //destroy: function (req, res) {
        // TODO
    }


module.exports = moviesController;

 