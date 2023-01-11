import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.interface';
import { SalaryEntity } from '../models/salary.entity';
import { Salary } from '../models/salary.interface';
import { SalaryService } from './salary.service';

const httpMocks = require('node-mocks-http');



describe('SalaryService', () => {
  let salaryService: SalaryService;

  const mockRequest = httpMocks.createRequest();
    mockRequest.user = <User>{
       
      "email":"shorouq@thinglogix.com"
  };

  const mockSalary: Salary = {
      "salary": 500,
      "effective_date": "01-01-2023",
      "user_id":mockRequest.user
  };

  const mockSalaryRepository = {
    createPost: jest
      .fn()
      .mockImplementation((user: User, salary: Salary) => {
        return {
          ...salary,
          user_id: user,
        };
      }),
    save: jest
      .fn()
      .mockImplementation((salary: Salary) =>
        Promise.resolve({ id: 1, ...salary }),
      ),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryService,
        {
          provide: getRepositoryToken(SalaryEntity),
          useValue: mockSalaryRepository,
        },
      ],
    }).compile();

    salaryService = moduleRef.get<SalaryService>(SalaryService);
  });

  it('should be defined', () => {
    expect(salaryService).toBeDefined();
  });

  it('should create a salary for a user', (done: jest.DoneCallback) => {
    salaryService
      .CreateSalary(mockRequest.user, mockSalary)
      .subscribe((user_salary: Salary) => {
        expect(user_salary).toEqual({
          id: expect.any(Number),
          ...mockSalary,
        });
        done();
      });
  });
});