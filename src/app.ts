import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());

app.use((request, response, next) => {
    console.log('Request received, processing at middleware 1');
    next();
})

// sample data
const users = [{
    firstName: 'Hugh',
    lastNamne: 'Thornhill'
}]

// let students = [{
//     firstName: 'Bobby',
//     lastName: 'Hill',
//     age: 15,
//     grade: 'freshman'
// }]

// let subjects = [{
//     name: 'history',
//     specific: 'World'
// }]

// let appointments = [{
//     date: "3-2-20",
//     timeStart: "2:00 PM",
//     timeEnd: "3:00 PM"
// }]


// GET methods
app.get('/users',(request, response, next) => {
    console.log('Request received, processing app.get for users');
    response.json(users);
    next();
})


// POST methods
app.post('/users',(request, response, next) => {
    console.log(request.body);
    const body = request.body;
    if(body) {
        users.push(body);
    }
    console.log('Request received - processing at app.post');
    response.send('Processed by app.post');
    next();
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})