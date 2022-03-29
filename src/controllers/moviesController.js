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
            // probar datetime-local
            release_date: req.body.release_date 
          } )
          .then(movies => {
             res.send("ALTA  REALIZADA")
            //res.render('moviesList.ejs', { movies: movies.id });
        }, ) }
    },     
    "edit": function(req,res) {
        console.log("esta en edit");
        console.log(req.params.id + "  es el id que consulto");
        console.log("id.Params es "+req.params.id)
       
        console.log("el req.params.title "+ req.params.title)
        
        db.Movie.findByPk(req.params.id)
        .then(movie => {
            res.render('moviesUpdate.ejs', {Movie:movie});
        });        
        //res.render("moviesUpdate.ejs",{Movie:Peli } )
    },      
    "update": function(req,res) {
        console.log("esta en update")
        const errors = validationResult(req) ;
        if (errors.errors.length !== 0){
            db.Movie.findByPk(req.params.id)
             .then(movie => {
                res.render('moviesUpdate.ejs',{errors: errors.mapped(errors),Movie:movie});
             } ) }
            //res.render ("moviesUpdate",{errors: errors.mapped(errors)},{movie:movie}) }      
        else {
            console.log ("en update el req.params id = "+ req.params.id)
            db.Movie.update ( {
                title : req.body.title,
                rating :req.body.rating,
                length : req.body.length,
                awards : req.body.awards,
                release_date: req.body.release_date  
            }, 
             { where: {id :req.params.id} 
        } );

        // db.Movie.upsert ({
        /*   id : req.params.id,
               title : req.body.title,
            rating :req.body.rating,
             length : req.body.length,
            awards : req.body.awards,
            realese_date: req.body.realese_date
        })*/
        res.send( "modificación existosa")            
             
}  },
    "delete": function (req, res) {
        console.log("esta en delete");
        console.log(req.params + "  es el id que consulto");
        console.log("id.Params es en delete  "+req.params.id)
       
        console.log("el req.params.title "+ req.params.title)
        db.Movie.findByPk(req.params.id)
        .then(movie => {            
            res.render('moviesDelete.ejs', {Movie:movie});
        });        
              
    },
    "destroy" : function(req,res){  
        console.log("entró a destroy y el params es =  " + req.params.id)   
        db.Movie.destroy( {
            where : {id: req.params.id} 
        } ) 
          res.send ("baja exitosa") }         
     }       

module.exports = moviesController;

 