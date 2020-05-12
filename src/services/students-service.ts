import { Student } from '../models/Student';
import * as studentsDao from '../daos/students-dao';

export function getAllStudents(): Promise<Student[]> {
    return studentsDao.getAllStudents();
}

export function getStudentById(id: number): Promise<Student> {
    return studentsDao.getStudentById(id);
}

export function saveStudent(student: any): Promise<Student> {
    const newStudent = new Student(
        undefined, student.firstName,
        student.lastName,
        new Date(student.birthdate),
        student.grade
    );
    if(student.firstName && student.lastName && student.birthdate && student.grade) {
        return studentsDao.saveStudent(newStudent);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchStudent(input: any): Promise<Student> {
    const birthdate = input.birthdate && new Date(input.birthdate);

    const student = new Student(
        input.id,
        input.firstName,
        input.lastName,
        birthdate,
        input.grade
    );

    if(!student.id) {
        throw new Error('400');
    }

    return studentsDao.patchStudent(student);
}