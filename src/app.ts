import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { tutorsRouter } from './routers/tutors-router';
import { studentsRouter } from './routers/students-router';
import { subjectsRouter } from './routers/subject-router';
import { appointmentsRouter } from './routers/appointments-router';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());

// app.use((request, response, next) => {
//     next();
// });

app.use('/tutors', tutorsRouter);
app.use('/students', studentsRouter);
app.use('/subjects', subjectsRouter);
app.use('/appointments', appointmentsRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed.');
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})