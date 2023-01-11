import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from,  Observable, switchMap,tap} from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/services/user.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SalaryEntity } from '../models/salary.entity';
import { Salary } from '../models/salary.interface';
import { SalaryValidetor } from '../models/salary.schema';

@Injectable()
export class SalaryService {

    constructor(@InjectRepository(SalaryEntity) private readonly salaryRepository: Repository<SalaryEntity>, private userService : UserService) { }
    
    CreateSalary(user: User, user_salary: Salary): Observable<Salary>  {
        const valid = SalaryValidetor(user_salary)
        if (valid.error) { throw new HttpException(valid.error.details[0].message, HttpStatus.BAD_REQUEST) }
        else {
            user_salary.user_id = user
            return this.userService.doesUserIDExist(user.id).pipe(tap((doesUserExist: boolean) => {
                if (doesUserExist)
                    throw new HttpException('A user with this id doesn’t exists.', HttpStatus.BAD_REQUEST);
                
            
            }), switchMap(() => {
                console.log("user",user_salary)
                return from(this.salaryRepository.save(user_salary))
            })
            )
        }
    }

    UpdateSalary(user: User, user_salary: Salary): Observable<UpdateResult> {
         const valid = SalaryValidetor(user_salary)
        if (valid.error) { throw new HttpException(valid.error.details[0].message, HttpStatus.BAD_REQUEST) }
        else {
            user_salary.user_id = user
            return this.userService.doesUserIDExist(user.id).pipe(tap((doesUserExist: boolean) => {
                if (doesUserExist)
                    throw new HttpException('A user with this id doesn’t exists.', HttpStatus.BAD_REQUEST);
                
            
            }), switchMap(() => {
                return from(this.salaryRepository.update(user, user_salary))
            })
            )
        }
    }

    GetSalaryByUserId(user: User): Observable<Salary> {
        return this.userService.doesUserIDExist(user.id).pipe(tap((doesUserExist: boolean) => {
            if (doesUserExist)
                throw new HttpException('A user with this id doesn’t exists.', HttpStatus.BAD_REQUEST);
                }), switchMap(() => {
            return from(this.salaryRepository.createQueryBuilder('salary').leftJoinAndSelect('salary.user_id', 'user_id').where('salary.user_id = :user_id', { user_id: user.id }).getOne())
        })
        )
    
        }

    DeleteSalary(id: number): Observable<DeleteResult>{
        return from(this.salaryRepository.delete(id))
    }


}
