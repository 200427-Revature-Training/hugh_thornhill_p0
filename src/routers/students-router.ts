import express from 'express';
import * as studentsService from '../services/students-service';

export const studentsRouter = express.Router();

studentsRouter.get('', (request, response, next) =>{
    console.log('Request received - processing at app.get');
    studentsService.getAllStudents().then(students => {
        response.json(students);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

studentsRouter.get('/:id', (request, response, next) => {
    // req.params returns paramaters of a matched route
    const id = +request.params.id;
    studentsService.getStudentById(id).then(student => {
    if(!student) {
        response.sendStatus(404);
    } else {
        response.json(student)
    }
    next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

studentsRouter.post('', (request, response, next) => {
    // request.body holds parameters that are sent from client as part of POST request
    const student = request.body;
    // console.log(request.body);
    studentsService.saveStudent(student)
        .then(newStudent => {
            response.status(201);
            response.json(newStudent);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

studentsRouter.patch('', (request, response, next) => {
    const student = request.body;
    studentsService.patchStudent(student)
        .then(updatedStudent => {
            if(updatedStudent) {
                response.json(updatedStudent);
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