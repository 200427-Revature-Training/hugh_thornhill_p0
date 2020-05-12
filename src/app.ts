import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { tutorsRouter } from './routers/tutors-router';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());

app.use('/tutors', tutorsRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed.');
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})