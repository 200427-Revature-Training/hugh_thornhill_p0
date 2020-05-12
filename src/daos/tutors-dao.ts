import { db } from './db';
import { Tutor, TutorRow } from '../models/Tutor';

export function getAllTutors(): Promise<Tutor[]> {
    const sql = 'SELECT * FROM tutors';

    // 1. Query database using sql statement above
    // 2. Query will return a promise typed as QueryResult<TutorRow>
    // 3. We can react to the database response by chaining a .then onto the query
    return db.query<TutorRow>(sql, []).then(result => {
        // 4. Extract rows from the query response
        const rows: TutorRow[] = result.rows;

        // console.log(rows);

        // 5. Convert row data format to Tutor objects
        const tutors: Tutor[] = rows.map(row => Tutor.from(row));
        return tutors;
    });
}

export function getTutorById(id: number): Promise<Tutor> {
    // get a tutor by ID, do not allow for sequel injection by using 
    // parameterized queries
    const sql = 'SELECT * FROM tutors WHERE id = $1';

    return db.query<TutorRow>(sql, [id])
        .then(result => result.rows.map(row => Tutor.from(row))[0]);
}

export function saveTutor(tutor: Tutor): Promise<Tutor> {
     const sql = 'INSERT INTO tutors (first_name, last_name, birthdate) \
     VALUES ($1, $2, $3) RETURNING *';

     return db.query<TutorRow>(sql, [
         tutor.firstName,
         tutor.lastName,
         tutor.birthdate.toISOString()
     ]).then(result => result.rows.map(row => Tutor.from(row))[0]);
}

export function patchTutor(tutor: Tutor): Promise<Tutor> {
    const sql = `UPDATE tutor SET first_name = COALESCE($1, first_name), \
    last_name =  COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
    WHERE id = $4 RETURNING *`;

    const birthdate = tutor.birthdate && tutor.birthdate.toISOString();

    const params = [
                    tutor.firstName,
                    tutor.lastName,
                    tutor.birthdate && tutor.birthdate.toISOString(),
                    tutor.id
                    ];

        return db.query<TutorRow>(sql, params)
            .then(result => result.rows.map(row => Tutor.from(row))[0]);
}