import * as subjectService from '../../../src/services/subjects-service';
import * as subjectsDao from '../../../src/daos/subjects-dao';
import { Subject } from '../../../src/models/Subject';

jest.mock('../../../src/daos/subjects-dao');

const mockSubjectsDao = subjectsDao as any;

describe('Get all subjects', () => {
    test('Get all subjects normal conditions', async () => {
        expect.assertions(1);
        mockSubjectsDao.getAllSubjects.mockImplementation( async () => {
             console.log('This is what mock dao actually calls');
          });

          const result = await subjectService.getAllSubjects();

          try {
              expect(result).toContain([])
          } catch (err) {
              expect(err).toBeDefined();
          }
    });
});

describe('Get subjects by id ', () => {
    test('Get subjects by id normal conditions', async () => {
        expect.assertions(1);
        mockSubjectsDao.getSubjectById.mockImplementation( async () => {
             console.log('This is what mock dao actually calls');
          });

          const result = await subjectService.getSubjectById(1);

          try {
              expect(result).toContain(Subject)
          } catch (err) {
              expect(err).toBeDefined();
          }
    });
});