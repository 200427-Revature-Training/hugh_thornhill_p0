import express from 'express';
import bodyParser from 'body-parser';
import { appointmentsRouter } from '../../src/routers/appointments-router';
import * as appointmentsService from '../../src/services/appointments-service';
import request from 'supertest';

jest.mock('../../src/services/appointments-service');
const mockAppointmentsService = appointmentsService as any;

const app = express();
app.use(bodyParser.json())
app.use('/appointments', appointmentsRouter);

describe('GET /appointments', () => {
    test('Returns normally under normal circumstances', async () => {
        mockAppointmentsService.getAllAppointments.mockImplementation(async () => []);
        await request(app)
            .get('/appointments')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockAppointmentsService.getAllAppointments.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/appointments')
            .expect(500);
    });
});

describe('POST /appointments', () => {
    test('Successful creation should return 201 status', async () => {
        mockAppointmentsService.saveAppointment.mockImplementation(async () => ({}));

        const payload = {
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        await request(app)
            .post('/appointments')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockAppointmentsService.saveAppointment.mockImplementation(async () => {throw new Error()});

        const payload = {
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        await request(app)
            .post('/appointments')
            .send(payload)
            .expect(500);
    });
});

describe('Patch /appointments', () => {
    test('Normal behavior patching appointment id status 200', async () => {
        mockAppointmentsService.patchAppointment.mockImplementation(async () => ({}));

        const payload = {
            id: 3,
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        await request(app)
        .patch('/appointments')
        .send(payload)
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
});

test('Patch error', async () => {
    mockAppointmentsService.patchAppointment.mockImplementation(async () => {throw new Error()});

    const payload = {
        startTime: '2000-01-01 22:00',
        endTime: '2000-01-01 23:00',
        tutorId: 1,
        studentId: 1,
        subjectId: 1
    };

    await request(app)
    .patch('/appointments')
    .send(payload)
    .expect(500);
    });
});

describe('GET /appointments/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        // parenthesis around empty object (curly brackets) forces it to interperet as an empty object
        mockAppointmentsService.getAppointmentById.mockImplementation(async () => ({}));
        await request(app)
        .get('/appointments/1')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockAppointmentsService.getAppointmentById.mockImplementation(async () => (0))
        await request(app)
        .get('/appointments/lala')
        .expect(404);
        // no need for expect for content type
    });

    test('500 internal server error', async() => {
        mockAppointmentsService.getAppointmentById.mockImplementation(async () => {throw new Error()});
        await request(app)
        .get('/appointments/')
        .expect(500)
    });
});

describe('Delete appointment', () => {
    test('Delete appointment normally', async()=> {
        mockAppointmentsService.deleteAppointment.mockImplementation(async ()=>({}));

        const payload = {
            id: 1,
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        await request(app)
        .delete('/appointments/1')
        .send(payload)
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Delete appointment error', async () => {
        mockAppointmentsService.deleteAppointment.mockImplementation(async () => {throw new Error()});

        const payload = {
            id: 1,
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        await request(app)
        .delete('/appointments/1')
        .send(payload)
        .expect(500);
    });
});
