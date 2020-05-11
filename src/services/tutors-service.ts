import { Tutor } from '../models/Tutor';
import * as tutorsDao from '../daos/tutors-dao';

export function getAllTutors(): Promise<Tutor[]> {
    return tutorsDao.getAllTutors();
}

export function getTutorById(id: number): Promise<Tutor> {
    return tutorsDao.getTutorById(id);
}

export function saveTutor(tutor: any): Promise<Tutor> {
    const newTutor = new Tutor(
        undefined, tutor.firstName,
        tutor.lastName,
        new Date(tutor.birthdate)
    );
    if(tutor.firstName && tutor.lastName && tutor.birthdate) {
        return tutorsDao.saveTutor(newTutor);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchTutor(input: any): Promise<Tutor> {
    const birthdate = input.birthdate && new Date(input.birthdate);

    const tutor = new Tutor(
        input.id,
        input.firstName,
        input.lastName,
        birthdate
    );

    if(!tutor.id) {
        throw new Error('400');
    }

    return tutorsDao.patchTutor(tutor);
}