import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Salary } from 'src/salary/models/salary.interface';
import { SalaryService } from 'src/salary/services/salary.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private salaryService : SalaryService) {
      
    }
    
    @Post()
    CreateUser(@Body() user:User ): Observable<User> {
        return this.userService.CreateUser(user)
    }

    @Put(':UserId')
    UpdateUser(@Param('UserId') userId:number, @Body() user:User ): Observable<UpdateResult>{
        return this.userService.UpdateUser(userId,user)
    }

    @Delete(':UserId')
    DeleteUser(@Param('UserId') userId : number): Observable<DeleteResult> {
        return this.userService.DeleteUser(userId)
    }

    @Get(':UserId')
    GetUser(@Param('UserId') userId:number): Observable<User>{
        return this.userService.GetUserById(userId)
    }


    @Get(':user_id/salary')
    getSalary(@Param('user_id') user_id:number): Observable<Salary> {
        return this.salaryService.GetSalaryByUserId({ id: user_id })
    }

}
