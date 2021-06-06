const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { BlockList } = require('net');
const { render } = require('ejs');

//express app

const app = express();

//connet to mongoDB
const dbURI = 'mongodb+srv://romanoff:test123@cluster0.rk4xs.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log('error'));
//listen fo request


//register view engine

app.set('view engine', 'ejs');
app.listen(3000);

//midlware and statici file

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));




app.get('/', (req, res) => {
    res.redirect('/blogs')
    
} );

app.get('/about', (req, res) => {

    res.render('about', { title: 'About'});


   // res.send('<p> About page </p>');
    
} );

app.get('/about-us', (req, res) => {
    //res.redirect('/about');
    res.render('about', { title: 'About'});
})

//blog router

app.get('/blogs', (req, res) => {
    Blog.find().sort( {createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})

        })
        .catch((err) => {
            console.log(err);
        })
})
 
app.post('/blogs', (req, res) => {
    //console.log(req.body);

    const blog = new Blog(req.body);

    blog.save()
        .then((result) =>{
            res.redirect('/blogs');
        })
        .catch((err) =>{
            console.log(err)
        })

})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', {blog: result, title: 'Blog Details'});
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create blog'});
})

//404 page

app.use((req,res) => {
  //  res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: '404 page'});
    
});