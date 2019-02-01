import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import User from './src/schemas/users';
import Genre from './src/schemas/genres';
import Rating from './src/schemas/ratings';

import cors from 'cors';
import { createToken } from './src/resolvers/create';
import { verifyToken } from './src/resolvers/verify';

import schema from './src/graphql';
import graphqlHTTP from 'express-graphql';

const JsonParser = bodyParser.json();
const app = express();
const PORT = process.env.PORT || 6430; 

mongoose.connect("mongodb://luis:abc123@ds211875.mlab.com:11875/devf-ex");

const DB = mongoose.connection;

DB.on('error', () => console.log("Failed to connect to mongoDB"))
    .once('open', () => console.log("Connected to MongoDB"));

app.listen(PORT, () => console.log(`Magic happens in port ${PORT}`));

app.use((cors()));

/** Users */

app.get('/addUser', (req, res) => {
    var user = new User({
        "name": "Walter",
        "lastName": "White",
        "email": "Heisenberg@meth.com",
        "password": "ilovejesse",
        "phone": "6221212152",
        "address": "Negra Arroyo Lane 8"
    });
    
    user.save((err) => {
        if(err) throw err;
        res.send('Usuario creado')
    });
})

app.post("/register", JsonParser, (req, res) => {
    var user = new User(req.body);
    console.log(req.body);

    user.save((err) => {
        if(err) throw err;
        res.send("Usuario registrado")
    })
})

app.get('/userList', (req, res) => {
    User.find({}).then(function(users) {
        res.send(users)
    })
})

app.use('/login', JsonParser, (req, res) => {
    if(req.method === 'POST') {
        const token = createToken(req.body.email, req.body.password)
        .then(token => {
            res.status(200).json({ token });
        })
        .catch(err => {
            res.status(403).json({
                message: 'Login failed INVALID CREDENTIALS'
            })
        })
    }
})


app.use('/verifyToken', JsonParser, (req, res) => {
    if(req.method === 'POST') {
        console.log("Entra a verify token")
        try {
            const token = req.headers['authorization']

            verifyToken(token)
            .then(user => {
                console.log(user)
                res.status(200).json({user});
            })
            .catch(err => {
                console.log(err)
            })
        } catch(e) {
            console.log(e.message);
            res.status(401).json({
                message: e.message
            })
        }
    }
})

/** Genres */
app.post('/addGenre', JsonParser, (req, res) => {
    let { name, description } = req.body;

    var genre = new Genre({
        name,
        description
    });

    genre.save((err) => {
        if(err) throw err;
        res.send('Género creado')
    })
})

app.get('/genreList', JsonParser, (req, res) => {
    Genre.find({}).then((genres) => {
        res.send(genres)
    })
})

/** Ratings */
app.post('/addRating', JsonParser, (req, res) => {
    let { name, description, age } = req.body;

    var rating = new Rating({
        name,
        description,
        age
    });

    rating.save((err) => {
        if(err) throw err;
        res.send('Rating creado')
    })
})

app.get('/ratingList', JsonParser, (req, res) => {
    Rating.find({}).then((ratings) => {
        res.send(ratings)
    })
})

app.use('/graphql', (req, res, next) => {
    const token = req.headers['authorization']
    try {
        req.user = verifyToken(token)
        next()
    } catch(err) {
        res.status(401).json({
            message: err.message
        })
    }
})

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    pretty: true,
    context: {
        user: req.user
    }
})))