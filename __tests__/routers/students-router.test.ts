import express from 'express';
import bodyParser from 'body-parser';
import { studentsRouter } from '../../src/routers/students-router';
import * as studentsService from '../../src/services/students-service';
import request from 'supertest';

jest.mock('../../src/services/students-service');
const mockStudentsService = studentsService as any;

const app = express();
app.use(bodyParser.json())
app.use('/students', studentsRouter);

describe('GET /students', () => {
    test('Returns normally under normal circumstances', async () => {
        mockStudentsService.getAllStudents.mockImplementation(async () => []);
        await request(app)
            .get('/students')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockStudentsService.getAllStudents.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/students')
            .expect(500);
    });
});

describe('POST /students', () => {
    test('Successful creation should return 201 status', async () => {
        mockStudentsService.saveStudent.mockImplementation(async () => ({}));

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        await request(app)
            .post('/students')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockStudentsService.saveStudent.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        await request(app)
            .post('/students')
            .send(payload)
            .expect(500);
    });
});

describe('GET /students/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        // parenthesis around empty object (curly brackets) forces it to interperet as an empty object
        mockStudentsService.getStudentById.mockImplementation(async () => ({}));
        await request(app)
        .get('/students/1')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockStudentsService.getStudentById.mockImplementation(async () => (0))
        await request(app)
        .get('/students/lala')
        .expect(404);
        // no need for expect for content type
    });

    test('500 internal server error', async() => {
        mockStudentsService.getStudentById.mockImplementation(async () => {throw new Error()});
        await request(app)
        .get('/students/')
        .expect(500)
    });
})