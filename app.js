const express = require('express');
const morgan = require('morgan');

//express app

const app = express();

//connet to mongoDB
const dbURI = 'mongodb+srv://romanoff:test123@cluster0.rk4xs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
 
//listen fo request


//register view engine

app.set('view engine', 'ejs');
app.listen(3000);

//midlware and statici file

app.use(express.static('public'))


app.use(morgan('tiny'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        {title: 'Mario fins starts', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing'},
        {title: 'How to defeat Mario', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing'},
    ];

    //res.send('<p> Home page </p>');
    //res.sendFile('./views/index.html',{ root: __dirname })
    res.render('index', { title: 'Home', blogs: blogs });
    
} );

app.get('/about', (req, res) => {

    res.render('about', { title: 'About'});


   // res.send('<p> About page </p>');
    
} );

app.get('/about-us', (req, res) => {
    //res.redirect('/about');
    res.render('about', { title: 'About'});
})
 

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create blog'});
})

//404 page

app.use((req,res) => {
  //  res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: '404 page'});
    
});