import express from 'express';
import * as subjectsService from '../services/subjects-service';

export const subjectsRouter = express.Router();

subjectsRouter.get('', (request, response, next) =>{
    console.log('Request received - processing at app.get');
    subjectsService.getAllSubjects().then(subjects => {
        response.json(subjects);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

subjectsRouter.get('/:id', (request, response, next) => {
    // req.params returns paramaters of a matched route
    const id = +request.params.id;
    subjectsService.getSubjectById(id).then(subject => {
    if(!subject) {
        response.sendStatus(404);
    } else {
        response.json(subject)
    }
    next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});