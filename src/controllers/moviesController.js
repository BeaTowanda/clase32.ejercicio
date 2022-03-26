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
                res.render('newestMovies', {movies});              
                
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    "add": function (req, res) {  
        console.log("está en add") ;      
      res.render("moviesAdd.ejs")    
    },
    "altaPeli": function (req, res) {
        console.log("esta en altaPeli")
        const errors = validationResult(req) ;
        if (errors.errors.length !== 0){
            res.render ("moviesAdd",{errors: errors.mapped(errors)}) }      
        else {
            db.Movie.create ({
            title : req.body.title,
            rating :req.body.rating,
            length : req.body.length,
            awards : req.body.awards,
            realese_date: req.body.realese_date 
          } )
          .then(movies => {
             res.send("ALTA  REALIZADA")
            //res.render('moviesList.ejs', { movies: movies.id });
        }, ) }
    },     
    "edit": function(req,res) {
        console.log("esta en edit");
        console.log(req.params.id + "  es el id que consulto");
        res.render("moviesUpdate.ejs",{movie: req.params})
    },      
    "update": function(req,res) {
        console.log("esta en update")
        const errors = validationResult(req) ;
        if (errors.errors.length !== 0){
            res.render ("moviesUpdate",{errors: errors.mapped(errors)}) }      
        else {
            db.Movie.update ( {
                title : req.body.title,
                rating :req.body.rating,
                length : req.body.length,
                awards : req.body.awards,
                realese_date: req.body.realese_date  
            }, 
             { where: {id :req.body.id} 
        } ) 
            .then (movies =>{
                res.send("Modificación Exitosa")
            })}
             
},
    //delete: function (req, res) {
        // TODO
    //},
    //destroy: function (req, res) {
        // TODO
    }


module.exports = moviesController;

 