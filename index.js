require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.static(__dirname + "/static"));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/results', function(req, res){
    axios.get(`http://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.API_KEY}`)
        .then(function(result){
            res.render('movies', {movies: result.data.Search});
        });
});

app.get('/movies/:movieid', function(req, res){
    axios.get(`http://www.omdbapi.com/?i=${req.params.movieid}&apikey=${process.env.API_KEY}`)
    .then(function(result){
        res.render('movie', {movie: result.data});
    });
})

app.listen(process.env.PORT);

