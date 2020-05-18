import { db } from './db';
import { Appointment, AppointmentRow } from '../models/Appointment';

export function getAllAppointments(): Promise<Appointment[]> {
    const sql = 'SELECT * FROM appointments';

    return db.query<AppointmentRow>(sql, []).then(result => {
        const rows: AppointmentRow[] = result.rows;
        const appointments: Appointment[] = rows.map(row => Appointment.from(row));
        return appointments;
    });
}

export function getAppointmentById(id: number): Promise<Appointment> {
    const sql = 'SELECT * FROM appointments WHERE id = $1';

    return db.query<AppointmentRow>(sql, [id])
        .then(result => result.rows.map(row => Appointment.from(row))[0]);
}

export function saveAppointment(appointment: Appointment): Promise<Appointment> {
    const sql = 'INSERT INTO appointments (start_time, end_time, tutor_id, student_id, subject_id) \
    VALUES ($1, $2, $3, $4, $5) RETURNING *';
    return db.query<AppointmentRow>(sql, [
        appointment.startTime.toLocaleString(),
        appointment.endTime.toLocaleString(),
        appointment.tutorId,
        appointment.studentId,
        appointment.subjectId
    ]).then(result => result.rows.map(row => Appointment.from(row))[0]);
}

export function patchAppointment(appointment: Appointment): Promise<Appointment> {
    const sql = `UPDATE appointments SET start_time = COALESCE($1, start_time), \
    end_time =  COALESCE($2, end_time), tutor_id = COALESCE($3, tutor_id), \
    student_id = COALESCE($4, student_id), subject_id = COALESCE($5, subject_id) \
    WHERE id = $6 RETURNING *`;

    const startTime = appointment.startTime && appointment.startTime.toLocaleString();
    const endTime = appointment.endTime && appointment.endTime.toLocaleString();
    const params = [
                    appointment.startTime && appointment.startTime.toLocaleString(),
                    appointment.endTime && appointment.endTime.toLocaleString(),
                    appointment.tutorId,
                    appointment.studentId,
                    appointment.subjectId,
                    appointment.id
                    ];

        return db.query<AppointmentRow>(sql, params)
            .then(result => result.rows.map(row => Appointment.from(row))[0]);
}

export function deleteAppointment(appointment: Appointment): Promise<Appointment> {
    /*
       Anatomy of Delete
       DELETE FROM tablename WHERE <predicate>;
       DELETE FROM people WHERE id = 5;
    */
    const sql = `DELETE FROM appointments WHERE id = $1`;

    return db.query<AppointmentRow>(sql, [appointment.id])
        .then(result => result.rows.map(row => Appointment.from(row))[0]);
}