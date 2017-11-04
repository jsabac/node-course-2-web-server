/*'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    var person = {
        name: 'Joshua',
        age: '23',
        gender: 'Male',
        likes: [
            'Esports',
            'Sports',
            'Programming'
        ]
    };
    var welcomeMessage = 'Welcome to Home Page';
    args = {
        pageTitle:'Home Page',
        creator: person,
        welcomeMessage: 'Welcome to Home Page'
    }
    response.render('home.hbs', args);
});

app.get('/about', (req, res) => {
    args = {
        pageTitle: 'About Page',
    };
    res.render('about.hbs',args);
});

app.get('/bad', (req, res) => {
    res.send({errorMessage:'Unable to fullfill request'});
});

app.listen(1337, () => {
    console.log('Server is up on port 1337;');
});
