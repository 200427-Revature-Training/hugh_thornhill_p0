export class Student {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: Date;
    grade: string;

    static from(obj: StudentRow): Student {
        const student = new Student(
            obj.id,
            obj.first_name,
            obj.last_name,
            new Date(obj.birthdate),
            obj.grade
        );
        return student;
    }

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        birthdate: Date,
        grade: string
    )
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.grade = grade;
    }
}

export interface StudentRow {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
    grade: string;
}