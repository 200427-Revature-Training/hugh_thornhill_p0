import express from 'express';
import bodyParser from 'body-parser';
import { subjectsRouter } from '../../src/routers/subjects-router';
import * as subjectsService from '../../src/services/subjects-service';
import request from 'supertest';

jest.mock('../../src/services/subjects-service');
const mockSubjectsService = subjectsService as any;

const app = express();
app.use(bodyParser.json())
app.use('/subjects', subjectsRouter);

describe('GET /subjects', () => {
    test('Returns normally under normal circumstances', async () => {
        mockSubjectsService.getAllSubjects.mockImplementation(async () => []);
        await request(app)
            .get('/subjects')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockSubjectsService.getAllSubjects.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/subjects')
            .expect(500);
    });
});

describe('GET /subjects/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        // parenthesis around empty object (curly brackets) forces it to interperet as an empty object
        mockSubjectsService.getSubjectById.mockImplementation(async () => ({}));
        await request(app)
        .get('/subjects/1')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockSubjectsService.getSubjectById.mockImplementation(async () => (0))
        await request(app)
        .get('/subjects/lala')
        .expect(404);
        // no need for expect for content type
    });

    test('500 internal server error', async() => {
        mockSubjectsService.getSubjectById.mockImplementation(async () => {throw new Error()});
        await request(app)
        .get('/subjects/')
        .expect(500)
    });
})