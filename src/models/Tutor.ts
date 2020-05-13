export class Tutor {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: Date;

    static from(obj: TutorRow): Tutor {
        const tutor = new Tutor(
            obj.id,
            obj.first_name,
            obj.last_name,
            new Date(obj.birthdate)
        );
        return tutor;
    }

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        birthdate: Date
    )
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }
}

export interface TutorRow {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
}