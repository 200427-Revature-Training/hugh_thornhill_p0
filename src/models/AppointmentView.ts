export class AppointmentView {
    id: number;
    startTime: Date;
    endTime: Date;
    tutorFirstName: string;
    tutorLastName: string;
    studentFirstName: string;
    studentLastName: string;
    grade: string;
    subjectName: string;

static from(obj: AppointmentViewRow): AppointmentView {
    const appointmentView = new AppointmentView(
        obj.id,
        new Date(obj.start_time),
        new Date(obj.end_time),
        obj.tutor_first_name,
        obj.tutor_last_name,
        obj.student_first_name,
        obj.student_last_name,
        obj.grade,
        obj.subject_name
    );
    return appointmentView;
}

constructor(
    id: number,
    startTime: Date,
    endTime: Date,
    tutorFirstName: string,
    tutorLastName: string,
    studentFirstName: string,
    studentLastName: string,
    grade: string,
    subjectName: string
    )
    {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.tutorFirstName = tutorFirstName;
    this.tutorLastName = tutorLastName;
    this.studentFirstName = studentFirstName;
    this.studentLastName = studentLastName;
    this.grade = grade;
    this.subjectName = subjectName;
}
}

export interface AppointmentViewRow {
id: number;
start_time: string;
end_time: string;
tutor_first_name: string;
tutor_last_name: string;
student_first_name: string;
student_last_name: string;
grade: string;
subject_name: string;
}