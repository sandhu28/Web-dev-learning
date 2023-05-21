const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongo DB
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', { useNewUrlParser: true });

// create schema
const articleSchema = {
    title: String,
    content: String
};

// create model
const Article = mongoose.model('Article', articleSchema);

const article1 = new Article({
    title: 'REST',
    content: 'REST is short for Representational State Transfer. It\'s an architectural style for designing APIs.'
});

const article2 = new Article({
    title: 'API',
    content: 'API stands for Application Programming Interface. It\'s a set of subroutine definitions, protocols, and tools for building application software.'
});

const article3 = new Article({
    title: 'Bootstrap',
    content: "This is a framework developed by Twitter that contains pre-made font-end templates for easily creating front-end."
});

const article4 = new Article({
    title: 'DOM',
    content: "The Document Object Model is like an API for interacting with out HTML."
});

const article5 = new Article({
    title: 'cricket',
    content: "Most played sport in India."
});

const article6 = new Article({
    title: 'badminton',
    content: "My most beloved sport:)"
});

const defaultArticles = [article1, article2, article3, article4, article5, article6];

// Article.insertMany(defaultArticles);

// methods targeting single route
app.route("/articles")

    .get(function (req, res) {
        Article.find()
            .then((arr) => {
                res.send(arr);
            })
            .catch((err) => {
                res.send(err);
            })
    })

    .post(function (req, res) {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save()
            .then((ele) => {
                res.send('Successfully added a new article.');
            })
            .catch((err) => {
                res.send(err);
            })

    })

    .delete(function (req, res) {
        Article.deleteMany({})
            .then((ele) => {
                console.log(ele);
                res.send('Successfully deleted all articles');
            })
            .catch((err) => {
                res.send(err);
            })
    });


app.listen(3000, function () {
    console.log("Server is running on port 3000");
})




// // GET all articles
// app.get('/articles', function (req, res) {
//     Article.find()
//         .then((arr) => {
//             res.send(arr);
//         })
//         .catch((err) => {
//             res.send(err);
//         })
// });

// // POST new article
// app.post('/articles', function (req, res) {

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     newArticle.save()
//         .then((ele) => {
//             res.send('Successfully added a new article.');
//         })
//         .catch((err) => {
//             res.send(err);
//         })

// })

// app.delete('/articles', function (req, res) {
//     Article.deleteMany({})
//         .then((ele) => {
//             console.log(ele);
//             res.send('Successfully deleted all articles');
//         })
//         .catch((err) => {
//             res.send(err);
//         })
// })