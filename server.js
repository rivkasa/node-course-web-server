const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to server.log');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

/*
app.use((req, res, next) => {
    res.render('maintenence.hbs', {
        pageTitle: 'Maintenence Page',
        welcomeMessage: 'We will be right back',
    });
});
*/

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle request'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});