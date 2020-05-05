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

const users = [{
    firstName: 'Hugh',
    lastNamne: 'Thornhill'
}]

app.get('/users',(request, response, next) => {
    console.log('Request received, processing app.get');
    response.json(users);
    next();
})

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