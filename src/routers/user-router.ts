import express from 'express';
export const userRouter = express.Router();

interface user {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}

let users = [{
    id: 1,
    userName: 'hughthorn',
    password: 'helloworld23',
    firstName: 'Hugh',
    lastName: 'Thornhill'
}];

userRouter.get('', (request, response, next) =>{
    console.log('Request received - processing at app.get');
    response.json(users);
    next();
});

userRouter.get('/userName/:name', (request, response, next) => {
    // req.params returns paramaters of a matched route
    const name = request.params.name;
    const matchedUserNames = users.filter((user) => user.userName === name);
    response.json(matchedUserNames);
    next();
});

userRouter.get('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);
    const user = users.filter((users) => users.id === id)[0];
    if (!user) {
        // nothing found with that id
        response.sendStatus(404);
    } else {
        // user found with that id
        response.json(user);
    }
    next();
});

userRouter.post('', (request, response, next) => {
    // request.body holds parameters that are sent from client as part of POST request
    console.log(request.body);
    const body = request.body;
    body.id = users.reduce((a, b) => a.id > b.id ? a : b).id + 1;

    if (body && body.userName) {
        users.push(body);
    }

    console.log('POST received, processing in app.post');
    response.status(201);
    response.json(body);
    next();
});