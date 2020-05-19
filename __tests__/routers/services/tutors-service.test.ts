import * as tutorService from '../../../src/services/tutors-service';
import * as tutorsDao from '../../../src/daos/tutors-dao';
import { Tutor } from '../../../src/models/Tutor';

jest.mock('../../../src/daos/tutors-dao');

const mockTutorsDao = tutorsDao as any;

describe('saveTutor', () => {
    test('422 returned if no firstName provided', async () => {
        expect.assertions(1);
        mockTutorsDao.saveTutor.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        }

        try {
            await tutorService.saveTutor(payload);
            fail('tutorService.saveTutor did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 if no lastName is provided', async () => {
        expect.assertions(1);
        mockTutorsDao.saveTutor.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            firstName: 'Waylon',
            birthdate: '2000-01-01'
        };

        try {
            await tutorService.saveTutor(payload);
            fail('tutorService.saveTutor did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no birthdate is provided', async () => {
        expect.assertions(1);
        mockTutorsDao.saveTutor.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers'
        };

        try {
            await tutorService.saveTutor(payload);
            fail('tutorService.saveTutor did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed into a Tutor object', async () => {
        mockTutorsDao.saveTutor.mockImplementation(o => o);

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        const result = await tutorService.saveTutor(payload);

        expect(payload).not.toBeInstanceOf(Tutor);
        expect(result).toBeInstanceOf(Tutor);
    });

    test('ID value of input is replaced in output', async () => {
        mockTutorsDao.saveTutor.mockImplementation(o => o);

        const payload = {
            id: 50,
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        const result = await tutorService.saveTutor(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockTutorsDao.saveTutor.mockImplementation(o => o);

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            likesCake: true
        };

        const result = await tutorService.saveTutor(payload) as any;

        expect(result.likesCake).not.toBeDefined();
    });

});

describe('patchTutor', () => {
    test('succesful patch', async () => {
        expect.assertions(1);

        mockTutorsDao.patchTutor
            .mockImplementation( () => ({}));

        const payload = {
            id: 1,
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        const result = await tutorService.patchTutor(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockTutorsDao.patchTutor.mockImplementation( () => ({}));

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        try {
            await tutorService.patchTutor(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});