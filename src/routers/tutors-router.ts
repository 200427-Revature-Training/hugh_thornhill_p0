import express from 'express';
import * as tutorsService from '../services/tutors-service';

export const tutorsRouter = express.Router();

// http://localhost:3000/tutors
tutorsRouter.get('', (request, response, next) =>{
    console.log('Request received - processing at app.get');
    tutorsService.getAllTutors().then(tutors => {
        response.json(tutors);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

// http://localhost:3000/tutors/1
tutorsRouter.get('/:id', (request, response, next) => {
    // req.params returns paramaters of a matched route
    const id = +request.params.id;
    tutorsService.getTutorById(id).then(tutor => {
    if(!tutor) {
        response.sendStatus(404);
    } else {
        response.json(tutor)
    }
    next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

// POST of http://localhost:3000/tutors
tutorsRouter.post('', (request, response, next) => {
    // request.body holds parameters that are sent from client as part of POST request
    const tutor = request.body;
    // console.log(request.body);
    tutorsService.saveTutor(tutor)
        .then(newTutor => {
            response.status(201);
            response.json(newTutor);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

// PATCH of http://localhost:3000/tutors

tutorsRouter.patch('', (request, response, next) => {
    const tutor = request.body;
    tutorsService.patchTutor(tutor)
        .then(updatedTutor => {
            if(updatedTutor) {
                response.json(updatedTutor);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});