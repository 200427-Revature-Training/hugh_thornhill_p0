export class Appointment {
    id: number;
    startTime: Date;
    endTime: Date;
    tutorId: number;
    studentId: number;
    subjectId: number;

    static from(obj: AppointmentRow): Appointment {
        const appointment = new Appointment(
            obj.id,
            new Date(obj.start_time),
            new Date(obj.end_time),
            obj.tutor_id,
            obj.student_id,
            obj.subject_id
        );
        return appointment;
    }

    constructor(
        id: number,
        startTime: Date,
        endTime: Date,
        tutorId: number,
        studentId: number,
        subjectId: number
        )
        {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.tutorId = tutorId;
        this.studentId = studentId;
        this.subjectId = subjectId;
    }
}

export interface AppointmentRow {
    id: number;
    start_time: string;
    end_time: string;
    tutor_id: number;
    student_id: number;
    subject_id: number;
}