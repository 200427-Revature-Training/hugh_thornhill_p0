import * as subjectService from '../../../src/services/subjects-service';
import * as subjectsDao from '../../../src/daos/subjects-dao';
import { Subject } from '../../../src/models/Subject';

jest.mock('../../../src/daos/subjects-dao');

const mockSubjectsDao = subjectsDao as any;