

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/services/user.service';

import { DeleteResult, UpdateResult } from 'typeorm';
import { SalaryController } from './salary.controller';
import { SalaryService } from '../services/salary.service';
import { Salary } from '../models/salary.interface';
import { User } from 'src/user/models/user.interface';
const httpMocks = require('node-mocks-http');


describe('SalaryController', () => {
  let salaryController: SalaryController;
  let salaryService: SalaryService;
  let userService: UserService;

  const mockRequest = httpMocks.createRequest();
    mockRequest.user = <User>{
       
      "email":"shorouq@thinglogix.com"
  };

  const mockSalary: Salary = {
    "salary": 500,
      "effective_date": "01-01-2023",
      "user_id":mockRequest.user
  };



  const mockDeleteResult: DeleteResult = {
    raw: [],
    affected: 1,
  };

  const mockUpdateResult: UpdateResult = {
    ...mockDeleteResult,
    generatedMaps: [],
  };

  const mockFeedService = {
    createPost: jest
      .fn()
      .mockImplementation((user: User, salary: Salary) => {
        return {
          id: 1,
          ...salary,
        };
      }),
    
    updatePost: jest.fn().mockImplementation(() => {
      return mockUpdateResult;
    }),
    deletePost: jest.fn().mockImplementation(() => {
      return mockDeleteResult;
    }),
  };
  const mockUserService = {};

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SalaryController],
      providers: [
        SalaryService,
        { provide: UserService, useValue: mockUserService }
      ],
    })
      .overrideProvider(SalaryService)
      .useValue(mockFeedService)
      .compile();

    salaryService = moduleRef.get<SalaryService>(SalaryService);
    userService = moduleRef.get<UserService>(UserService);

    salaryController = moduleRef.get<SalaryController>(SalaryController);
  });

  it('should be defined', () => {
    expect(salaryController).toBeDefined();
  });

  it('should create a salary', () => {
    expect(salaryController.createSalary(mockSalary, mockRequest)).toEqual({
      id: expect.any(Number),
      ...mockSalary,
    });
  });

  

  it('should update a salary', () => {
    expect(
      salaryController.putSalary(1, { ...mockSalary, salary:8888 }),
    ).toEqual(mockUpdateResult);
  });

  it('should delete a salary', () => {
    expect(salaryController.deleteSalary(1)).toEqual(mockDeleteResult);
  });
});
