import * as studentService from '../../../src/services/students-service';
import * as studentsDao from '../../../src/daos/students-dao';
import { Student } from '../../../src/models/Student';

jest.mock('../../../src/daos/students-dao');

const mockStudentsDao = studentsDao as any;

describe('saveStudent', () => {
    test('422 returned if no firstName provided', async () => {
        expect.assertions(1);
        mockStudentsDao.saveStudent.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        }

        try {
            await studentService.saveStudent(payload);
            fail('studentService.saveStudent did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 if no lastName is provided', async () => {
        expect.assertions(1);
        mockStudentsDao.saveStudent.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            firstName: 'Waylon',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        try {
            await studentService.saveStudent(payload);
            fail('studentService.saveStudent did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no birthdate is provided', async () => {
        expect.assertions(1);
        mockStudentsDao.saveStudent.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            grade: 'Freshman'
        };

        try {
            await studentService.saveStudent(payload);
            fail('studentService.saveStudent did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no grade is provided', async () => {
        expect.assertions(1);
        mockStudentsDao.saveStudent.mockImplementation( () => {
            console.log('This is what the mock dao calls');
        });

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01'
        };

        try {
            await studentService.saveStudent(payload);
            fail('studentService.saveStudent did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    })

    test('Input object transformed into a Student object', async () => {
        mockStudentsDao.saveStudent.mockImplementation(o => o);

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        const result = await studentService.saveStudent(payload);

        expect(payload).not.toBeInstanceOf(Student);
        expect(result).toBeInstanceOf(Student);
    });

    test('ID value of input is replaced in output', async () => {
        mockStudentsDao.saveStudent.mockImplementation(o => o);

        const payload = {
            id: 50,
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        const result = await studentService.saveStudent(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockStudentsDao.saveStudent.mockImplementation(o => o);

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman',
            likesCake: true
        };

        const result = await studentService.saveStudent(payload) as any;

        expect(result.likesCake).not.toBeDefined();
    });

});

describe('patchStudent', () => {
    test('succesful patch', async () => {
        expect.assertions(1);

        mockStudentsDao.patchStudent
            .mockImplementation( () => ({}));

        const payload = {
            id: 1,
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        const result = await studentService.patchStudent(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockStudentsDao.patchStudent.mockImplementation( () => ({}));

        const payload = {
            firstName: 'Waylon',
            lastName: 'Smithers',
            birthdate: '2000-01-01',
            grade: 'Freshman'
        };

        try {
            await studentService.patchStudent(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});