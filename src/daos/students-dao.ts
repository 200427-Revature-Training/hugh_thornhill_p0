/* istanbul ignore file */
import { db } from './db';
import { Student, StudentRow } from '../models/Student';

export function getAllStudents(): Promise<Student[]> {
    const sql = 'SELECT * FROM students';

    return db.query<StudentRow>(sql, []).then(result => {
        const rows: StudentRow[] = result.rows;
        const students: Student[] = rows.map(row => Student.from(row));
        return students;
    });
}

export function getStudentById(id: number): Promise<Student> {
    const sql = 'SELECT * FROM students WHERE id = $1';

    return db.query<StudentRow>(sql, [id])
        .then(result => result.rows.map(row => Student.from(row))[0]);
}

export function saveStudent(student: Student): Promise<Student> {
    const sql = 'INSERT INTO students (first_name, last_name, birthdate, grade) \
    VALUES ($1, $2, $3, $4) RETURNING *';

    return db.query<StudentRow>(sql, [
        student.firstName,
        student.lastName,
        student.birthdate.toISOString(),
        student.grade
    ]).then(result => result.rows.map(row => Student.from(row))[0]);
}

export function patchStudent(student: Student): Promise<Student> {
    const sql = `UPDATE students SET first_name = COALESCE($1, first_name), \
    last_name =  COALESCE($2, last_name), birthdate = COALESCE($3, birthdate), \
    grade = COALESCE($4, grade) WHERE id = $5 RETURNING *`;

    const birthdate = student.birthdate && student.birthdate.toISOString();

    const params = [
                    student.firstName,
                    student.lastName,
                    student.birthdate && student.birthdate.toISOString(),
                    student.grade,
                    student.id
                    ];

        return db.query<StudentRow>(sql, params)
            .then(result => result.rows.map(row => Student.from(row))[0]);
}