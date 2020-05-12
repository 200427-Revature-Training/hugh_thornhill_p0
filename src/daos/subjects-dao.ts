import { db } from './db';
import { Subject, SubjectRow } from '../models/Subject';

export function getAllSubjects(): Promise<Subject[]> {
    const sql = 'SELECT * FROM subjects';

    return db.query<SubjectRow>(sql, []).then(result => {
        const rows: SubjectRow[] = result.rows;
        const subjects: Subject[] = rows.map(row => Subject.from(row));
        return subjects;
    });
}

export function getSubjectById(id: number): Promise<Subject> {
    const sql = 'SELECT * FROM subjects WHERE id = $1';

    return db.query<SubjectRow>(sql, [id])
        .then(result => result.rows.map(row => Subject.from(row))[0]);
}