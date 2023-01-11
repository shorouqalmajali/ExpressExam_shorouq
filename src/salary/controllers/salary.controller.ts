import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Salary } from '../models/salary.interface';
import { SalaryService } from '../services/salary.service';

@Controller('salary')
export class SalaryController {

    constructor(private salaryService : SalaryService) {
        
    }

    @Post(':id/create')
    createSalary(@Body() salary:Salary,@Param('id') id:number):Observable<Salary> {
       return this.salaryService.CreateSalary({ id:id },salary)
    }

    @Get(':id')
    getSalary(@Param('id') id:number): Observable<Salary> {
        return this.salaryService.GetSalaryByUserId({ id: id })
    }

    @Put(':id/update')
    putSalary(@Param('id') id:number, @Body() salary:Salary): Observable<UpdateResult>{
        return this.salaryService.UpdateSalary({id:id},salary)
    }

    @Delete(':id')
    deleteSalary(@Param('id') id:number):Observable<DeleteResult> {
        return this.salaryService.DeleteSalary(id)
    }
}
