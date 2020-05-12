export class Subject {
    id: number;
    subjectName: string;

    static from(obj: SubjectRow): Subject {
        const subject = new Subject(
            obj.id, obj.subject_name);
        return subject;
    }

    constructor(id: number, subjectName: string) {
        this.id = id;
        this.subjectName = subjectName;
    }
}

export interface SubjectRow {
    id: number;
    subject_name: string;
}