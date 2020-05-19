import { Appointment } from '../models/Appointment';
import * as appointmentsDao from '../daos/appointments-dao';
import { AppointmentView } from '../src/models/AppointmentView';

export function getAllAppointments(): Promise<AppointmentView[]> {
    return appointmentsDao.getAllAppointments();
}

export function getAppointmentById(id: number): Promise<AppointmentView> {
    return appointmentsDao.getAppointmentById(id);
}

export function saveAppointment(appointment: any): Promise<Appointment> {
    const newAppointment = new Appointment(
        undefined,
        new Date(appointment.startTime),
        new Date(appointment.endTime),
        appointment.tutorId,
        appointment.studentId,
        appointment.subjectId
    );
    if(
        appointment.startTime &&
        appointment.endTime &&
        appointment.tutorId &&
        appointment.studentId &&
        appointment.subjectId
        )
    {
        return appointmentsDao.saveAppointment(newAppointment);
    }
    else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchAppointment(input: any): Promise<Appointment> {
    const startTime = input.startTime && new Date(input.startTime);
    const endTime = input.endTime && new Date(input.endTime);

    const appointment = new Appointment(
        input.id,
        startTime,
        endTime,
        input.tutorId,
        input.studentId,
        input.subjectId
    );

    if(!appointment.id) {
        throw new Error('400');
    }

    return appointmentsDao.patchAppointment(appointment);
}

export function deleteAppointment(appointment: Appointment): Promise<Appointment> {
    return appointmentsDao.deleteAppointment(appointment);
}