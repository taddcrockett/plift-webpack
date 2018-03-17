const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))

let lifts = { "Bench": [], "Squat": [], "Deadlift": []};
let id = 0;

// setup some random data

app.post('/api/liftlog', (req, res) => {
  id = id + 1;
  let liftLog = {id: id, weight: req.body.weight, reps: req.body.reps, date: Date.now()};
  lifts[req.body.lift].push(liftLog);
  res.send(liftLog);
});

app.get('/api/liftlog/:lift', (req, res) => {
    res.send(lifts[req.params.lift]);
});

app.put('/api/liftlog/:lift/:id', (req, res) => {
    lifts[req.params.lift].forEach(element => {
        if (element.id === parseInt(req.params.id)) {
            element.weight = req.body.weight;
            element.reps = req.body.reps;
        }
    });
    res.send(lifts[req.params.lift]);
});

app.delete('/api/liftlog', (req, res) => {
  lifts = { "Bench": [], "Squat": [], "Deadlift": []};
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
