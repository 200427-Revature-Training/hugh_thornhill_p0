import express from 'express';
import * as appointmentsService from '../services/appointments-service';

export const appointmentsRouter = express.Router();

appointmentsRouter.get('', (request, response, next) =>{
    console.log('Request received - processing at app.get');
    appointmentsService.getAllAppointments().then(appointments => {
        response.json(appointments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

appointmentsRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    appointmentsService.getAppointmentById(id).then(appointment => {
        if(!appointment) {
            response.sendStatus(404);
        } else {
            response.json(appointment);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

appointmentsRouter.post('', (request, response, next) => {
    const appointment = request.body; 
    appointmentsService.saveAppointment(appointment)
        .then(newAppointment => {
            response.status(201);
            response.json(newAppointment);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
});

appointmentsRouter.patch('', (request, response, next) => {
    const appointment = request.body;
    appointmentsService.patchAppointment(appointment)
        .then(updatedAppointment => {
            if(updatedAppointment) {
                response.json(updatedAppointment);
            }
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});

appointmentsRouter.delete('/:id', (request, response, next) => {
    const appointment = request.body;

    appointmentsService.deleteAppointment(appointment)
    .then(deleteAppointment => {
        response.json(deleteAppointment);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});