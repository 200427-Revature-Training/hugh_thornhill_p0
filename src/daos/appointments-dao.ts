/* istanbul ignore file */
import { db } from './db';
import { Appointment, AppointmentRow } from '../models/Appointment';
import { AppointmentView, AppointmentViewRow } from '../models/AppointmentView';
// const moment = require('moment-timezone');
// moment().tz('America/New_York').format();


export function getAllAppointments(): Promise<AppointmentView[]> {
    const sql = 'SELECT * FROM appointments_full_views;';

    return db.query<AppointmentViewRow>(sql, []).then(result => {
        const rows: AppointmentViewRow[] = result.rows;
        const appointments: AppointmentView[] = rows.map(row => AppointmentView.from(row));
        return appointments;
    });
}

export function getAppointmentById(id: number): Promise<AppointmentView> {
    const sql = 'SELECT * FROM appointments_full_views WHERE id = $1';

    return db.query<AppointmentViewRow>(sql, [id])
        .then(result => result.rows.map(row => AppointmentView.from(row))[0]);
}

export function saveAppointment(appointment: Appointment): Promise<Appointment> {
    const sql = 'INSERT INTO appointments (start_time, end_time, tutor_id, student_id, subject_id) \
    VALUES ($1, $2, $3, $4, $5) RETURNING *';

    return db.query<AppointmentRow>(sql, [
        appointment.startTime.toLocaleString("en-us"),
        appointment.endTime.toLocaleString("en-us"),
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

    const startTime = appointment.startTime && appointment.startTime.toLocaleString("en-us");
    const endTime = appointment.endTime && appointment.endTime.toLocaleString("en-us");
    const params = [
                    appointment.startTime && appointment.startTime.toLocaleString("en-us"),
                    appointment.endTime && appointment.endTime.toLocaleString("en-us"),
                    appointment.tutorId,
                    appointment.studentId,
                    appointment.subjectId,
                    appointment.id
                    ] ;

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