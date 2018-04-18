const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

let lifts = { "Bench": [], "Squat": [], "Deadlift": [] };
let id = 0;

app.post('/api/login', (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).send();
    knex('users').where('email', req.body.email).first().then(user => {
        if (user === undefined) {
            res.status(403).send("Invalid credentials");
            throw new Error('abort');
        }
        return [bcrypt.compare(req.body.password, user.hash), user];
    }).spread((result, user) => {
        if (result)
            res.status(200).json({ user: { username: user.username, name: user.name, id: user.id } });
        else
            res.status(403).send("Invalid credentials");
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});

app.post('/api/users', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
        return res.status(400).send();
    knex('users').where('email', req.body.email).first().then(user => {
        if (user !== undefined) {
            res.status(403).send("Email address already exists");
            throw new Error('abort');
        }
        return knex('users').where('username', req.body.username).first();
    }).then(user => {
        if (user !== undefined) {
            res.status(409).send("User name already exists");
            throw new Error('abort');
        }
        return bcrypt.hash(req.body.password, saltRounds);
    }).then(hash => {
        return knex('users').insert({
            email: req.body.email, hash: hash, username: req.body.username,
            name: req.body.name, role: 'user'
        });
    }).then(ids => {
        return knex('users').where('id', ids[0]).first().select('username', 'name', 'id');
    }).then(user => {
        res.status(200).json({ user: user });
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});

app.post('/api/users/:userid/liftlog', (req, res) => {
    let userid = parseInt(req.params.userid);
    knex('users').where('id', userid).first().then(user => {
        return knex('lifts').insert({ user_id: userid, lift: req.body.lift, weight: req.body.weight, reps: req.body.reps, created: new Date() });
    }).then(ids => {
        return knex('lifts').where('id', ids[0]).first();
    }).then(tweet => {
        res.status(200).json({ lifts: lifts });
        return;
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error });
    });
});

app.get('/api/users/:userid/liftlog/:lift', (req, res) => {
    let userid = parseInt(req.params.userid);
    let lift = req.params.lift;
    knex('users').join('lifts', 'users.id', 'lifts.user_id')
        .where('users.id', userid).andWhere('lifts.lift', lift)
        .orderBy('created', 'desc')
        .select('lifts.id', 'lift', 'weight', 'reps', 'username', 'name', 'created').then(lifts => {
            res.status(200).json({ lifts: lifts });
        }).catch(error => {
            res.status(500).json({ error });
        });
});

app.put('/api/users/:userid/liftlog/:lift/:id', (req, res) => {
    let userid = parseInt(req.params.userid);
    let id = parseInt(req.params.id);
    let lift = req.params.lift;
    knex('lifts')
        .where('id', id)
        .update({
            weight: req.body.weight,
            reps: req.body.reps
        })
        .then(ids => {
            knex('users').join('lifts', 'users.id', 'lifts.user_id')
                .where('users.id', userid).andWhere('lifts.lift', lift)
                .orderBy('created', 'desc')
                .select('lifts.id', 'lift', 'weight', 'reps', 'username', 'name', 'created').then(lifts => {
                    res.status(200).json({ lifts: lifts });
                }).catch(error => {
                    res.status(500).json({ error });
                });
        })
});

app.delete('/api/liftlog', (req, res) => {
    knex('lifts').del().then(ids => {
        res.sendStatus(200);
    }).catch(error => {
        res.status(500).json({ error });
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
