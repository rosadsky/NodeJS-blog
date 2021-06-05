const express = require('express');

//express app

const app = express();

//listen fo request


//register view engine

app.set('view engine', 'ejs');



app.listen(3000);

app.get('/', (req, res) => {

    //res.send('<p> Home page </p>');
    //res.sendFile('./views/index.html',{ root: __dirname })
    res.render('index');
    
} );

app.get('/about', (req, res) => {

    res.render('about');


   // res.send('<p> About page </p>');
    
} );

app.get('/about-us', (req, res) => {
    //res.redirect('/about');
    res.render('about');
})


app.get('/blogs/create', (req, res) => {
    res.render('create');
})

//404 page

app.use((req,res) => {
  //  res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404');
    
});