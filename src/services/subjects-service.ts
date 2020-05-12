import { Subject } from '../models/Subject';
import * as subjectsDao from '../daos/subjects-dao';

export function getAllSubjects(): Promise<Subject[]> {
    return subjectsDao.getAllSubjects();
}

export function getSubjectById(id: number): Promise<Subject> {
    return subjectsDao.getSubjectById(id);
}