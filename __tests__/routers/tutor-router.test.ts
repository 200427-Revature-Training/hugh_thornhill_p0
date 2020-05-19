import express from 'express';
import bodyParser from 'body-parser';
import { tutorsRouter } from '../../src/routers/tutors-router';
import * as tutorsService from '../../src/services/tutors-service';
import request from 'supertest';

jest.mock('../../src/services/tutors-service');
const mockTutorsService = tutorsService as any;

const app = express();
app.use(bodyParser.json())
app.use('/tutors', tutorsRouter);

describe('GET /tutors', () => {
    test('Returns normally under normal circumstances', async () => {
        mockTutorsService.getAllTutors.mockImplementation(async () => []);
        await request(app)
            .get('/tutors')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockTutorsService.getAllTutors.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/tutors')
            .expect(500);
    });
});

describe('POST /tutors', () => {
    test('Successful creation should return 201 status', async () => {
        mockTutorsService.saveTutor.mockImplementation(async () => ({}));

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        await request(app)
            .post('/tutors')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockTutorsService.saveTutor.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        await request(app)
            .post('/tutors')
            .send(payload)
            .expect(500);
    });
});

describe('GET /tutors/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        // parenthesis around empty object (curly brackets) forces it to interperet as an empty object
        mockTutorsService.getTutorById.mockImplementation(async () => ({}));
        await request(app)
        .get('/tutors/1')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockTutorsService.getTutorById.mockImplementation(async () => (0))
        await request(app)
        .get('/tutors/lala')
        .expect(404);
        // no need for expect for content type
    });

    test('500 internal server error', async() => {
        mockTutorsService.getTutorById.mockImplementation(async () => {throw new Error()});
        await request(app)
        .get('/tutors/')
        .expect(500)
    });
})