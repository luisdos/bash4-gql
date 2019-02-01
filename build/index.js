'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users = require('./src/schemas/users');

var _users2 = _interopRequireDefault(_users);

var _genres = require('./src/schemas/genres');

var _genres2 = _interopRequireDefault(_genres);

var _ratings = require('./src/schemas/ratings');

var _ratings2 = _interopRequireDefault(_ratings);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _create = require('./src/resolvers/create');

var _verify = require('./src/resolvers/verify');

var _graphql = require('./src/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonParser = _bodyParser2.default.json();
var app = (0, _express2.default)();
var PORT = process.env.PORT || 6430;

_mongoose2.default.connect("mongodb://luis:abc123@ds211875.mlab.com:11875/devf-ex");

var DB = _mongoose2.default.connection;

DB.on('error', function () {
    return console.log("Failed to connect to mongoDB");
}).once('open', function () {
    return console.log("Connected to MongoDB");
});

app.listen(PORT, function () {
    return console.log('Magic happens in port ' + PORT);
});

app.use((0, _cors2.default)());

/** Users */

app.get('/addUser', function (req, res) {
    var user = new _users2.default({
        "name": "Walter",
        "lastName": "White",
        "email": "Heisenberg@meth.com",
        "password": "ilovejesse",
        "phone": "6221212152",
        "address": "Negra Arroyo Lane 8"
    });

    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario creado');
    });
});

app.post("/register", JsonParser, function (req, res) {
    var user = new _users2.default(req.body);
    console.log(req.body);

    user.save(function (err) {
        if (err) throw err;
        res.send("Usuario registrado");
    });
});

app.get('/userList', function (req, res) {
    _users2.default.find({}).then(function (users) {
        res.send(users);
    });
});

app.use('/login', JsonParser, function (req, res) {
    if (req.method === 'POST') {
        var token = (0, _create.createToken)(req.body.email, req.body.password).then(function (token) {
            res.status(200).json({ token: token });
        }).catch(function (err) {
            res.status(403).json({
                message: 'Login failed INVALID CREDENTIALS'
            });
        });
    }
});

app.use('/verifyToken', JsonParser, function (req, res) {
    if (req.method === 'POST') {
        console.log("Entra a verify token");
        try {
            var token = req.headers['authorization'];

            (0, _verify.verifyToken)(token).then(function (user) {
                console.log(user);
                res.status(200).json({ user: user });
            }).catch(function (err) {
                console.log(err);
            });
        } catch (e) {
            console.log(e.message);
            res.status(401).json({
                message: e.message
            });
        }
    }
});

/** Genres */
app.post('/addGenre', JsonParser, function (req, res) {
    var _req$body = req.body,
        name = _req$body.name,
        description = _req$body.description;


    var genre = new _genres2.default({
        name: name,
        description: description
    });

    genre.save(function (err) {
        if (err) throw err;
        res.send('Género creado');
    });
});

app.get('/genreList', JsonParser, function (req, res) {
    _genres2.default.find({}).then(function (genres) {
        res.send(genres);
    });
});

/** Ratings */
app.post('/addRating', JsonParser, function (req, res) {
    var _req$body2 = req.body,
        name = _req$body2.name,
        description = _req$body2.description,
        age = _req$body2.age;


    var rating = new _ratings2.default({
        name: name,
        description: description,
        age: age
    });

    rating.save(function (err) {
        if (err) throw err;
        res.send('Rating creado');
    });
});

app.get('/ratingList', JsonParser, function (req, res) {
    _ratings2.default.find({}).then(function (ratings) {
        res.send(ratings);
    });
});

app.use('/graphql', function (req, res, next) {
    var token = req.headers['authorization'];
    try {
        req.user = (0, _verify.verifyToken)(token);
        next();
    } catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
});

app.use('/graphql', (0, _expressGraphql2.default)(function (req, res) {
    return {
        schema: _graphql2.default,
        graphiql: true,
        pretty: true,
        context: {
            user: req.user
        }
    };
}));