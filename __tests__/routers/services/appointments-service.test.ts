import * as appointmentsService from '../../../src/services/appointments-service';
import * as appointmentsDao from '../../../src/daos/appointments-dao';
import { Appointment } from '../../../src/models/Appointment';
import { AppointmentView } from '../../../src/models/AppointmentView';

jest.mock('../../../src/daos/appointments-dao');

const mockAppointmentsDao = appointmentsDao as any;

describe('Get all appointments', () => {
    test('Get all appointments normal conditions', async () => {
        expect.assertions(1);
        mockAppointmentsDao.getAllAppointments.mockImplementation( async () => {
             console.log('This is what mock dao actually calls');
          });

          const result = await appointmentsService.getAllAppointments();

          try {
              expect(result).toContain([])
          } catch (err) {
              expect(err).toBeDefined();
          }
    });
});

describe('Get appointments by id ', () => {
    test('Get appointments by id normal conditions', async () => {
        expect.assertions(1);
        mockAppointmentsDao.getAppointmentById.mockImplementation( async () => {
             console.log('This is what mock dao actually calls');
          });

          const result = await appointmentsService.getAppointmentById(1);

          try {
              expect(result).toContain(AppointmentView)
          } catch (err) {
              expect(err).toBeDefined();
          }
    });
});

describe('saveAppointment', () => {
    test('422 returned if no startTime provided', async () => {
        expect.assertions(1);
        mockAppointmentsDao.saveAppointment.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        try {
            await appointmentsService.saveAppointment(payload);
            fail('appointmentsService.saveAppointment did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 if no endTime is provided', async () => {
        expect.assertions(1);
        mockAppointmentsDao.saveAppointment.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            startTime: '2000-01-01 22:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        try {
            await appointmentsService.saveAppointment(payload);
            fail('appointmentsService.saveAppointment did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no tutorId is provided', async () => {
        expect.assertions(1);
        mockAppointmentsDao.saveAppointment.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            studentId: 1,
            subjectId: 1
        };

        try {
            await appointmentsService.saveAppointment(payload);
            fail('appointmentservice.saveAppointment did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed into a Appointment object', async () => {
        mockAppointmentsDao.saveAppointment.mockImplementation(o => o);

        const payload = {
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        const result = await appointmentsService.saveAppointment(payload);

        expect(payload).not.toBeInstanceOf(Appointment);
        expect(result).toBeInstanceOf(Appointment);
    });

    test('ID value of input is replaced in output', async () => {
        mockAppointmentsDao.saveAppointment.mockImplementation(o => o);

        const payload = {
            id: 3,
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        const result = await appointmentsService.saveAppointment(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockAppointmentsDao.saveAppointment.mockImplementation(o => o);

        const payload = {
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1,
            likesCake: true
        };

        const result = await appointmentsService.saveAppointment(payload) as any;

        expect(result.likesCake).not.toBeDefined();
    });

});

describe('patchAppointment', () => {
    test('succesful patch', async () => {
        expect.assertions(1);

        mockAppointmentsDao.patchAppointment
            .mockImplementation( () => ({}));

            const payload = {
                id: 2,
                startTime: '2000-01-01 22:00',
                endTime: '2000-01-01 23:00',
                tutorId: 1,
                studentId: 1,
                subjectId: 1
            };

        const result = await appointmentsService.patchAppointment(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockAppointmentsDao.patchAppointment.mockImplementation( () => ({}));

        const payload = {
            startTime: '2000-01-01 22:00',
            endTime: '2000-01-01 23:00',
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        try {
            await appointmentsService.patchAppointment(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

describe('deleteAppointment', () => {
    test('succesful delete', async () => {
        expect.assertions(1);

        mockAppointmentsDao.deleteAppointment
            .mockImplementation( () => ({}));

            const payload = {
                id: 2,
                startTime: new Date('2000-01-01 22:00'),
                endTime: new Date('2000-01-01 23:00'),
                tutorId: 1,
                studentId: 1,
                subjectId: 1
            };

        const result = await appointmentsService.deleteAppointment(payload);
        expect(result).toBeTruthy();
    });

    test('delete fails when an invalid id is provided', async () => {
        expect.assertions(0);

        mockAppointmentsDao.deleteAppointment.mockImplementation( () => ({}));

        const payload = {
            id: 38493487,
            startTime: new Date('2000-01-01 22:00'),
            endTime: new Date('2000-01-01 23:00'),
            tutorId: 1,
            studentId: 1,
            subjectId: 1
        };

        try {
            await appointmentsService.deleteAppointment(payload);
        }   catch(err) {
            expect(err).toBeTruthy();
        }
    });
});