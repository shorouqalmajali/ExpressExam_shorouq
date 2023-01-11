import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of , switchMap,tap} from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entitiy';
import { User } from '../models/user.interface';
import * as bcrypt from 'bcrypt';
import { UserValidetor } from '../models/user.schema';

@Injectable()
export class UserService {
      constructor(@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>) {
    
      }
   hashPassword(password: string): Observable<any>{
    return from(bcrypt.hash(password, 12));
  } 
   
    doesUserExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ where : {email} })).pipe(
      switchMap((user: User) => {
        return of(!!user);
      }),
    );
  }
    
  doesUserIDExist(id: number): Observable<boolean> {
    return from(this.userRepository.findOne({ where : {id} })).pipe(
      switchMap((user: User) => {
        return of(!user);
      }),
    );
  }
    
  CreateUser(user: User): Observable<User> {
    const valid = UserValidetor(user)
    
    if (valid.error) { throw new HttpException(valid.error.details[0].message, HttpStatus.BAD_REQUEST); } else {
      const { firstname, lastname, email, password } = user;
      return this.doesUserExist(email).pipe(tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException('A user with this email address already exists.', HttpStatus.BAD_REQUEST);
                
            
      }), switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(this.userRepository.save({
              firstname,
              lastname,
              email,
              password: hashedPassword,
            })).pipe(map((user: User) => {
              delete user.password
              return user
            }))
          })
        )
      })
      )
            
    }
     
    }

    GetUserById(id: number): Observable<User> {
      return from(
          this.userRepository.findOne({ where: { id } }),
    );
    }

    UpdateUser(id: number, user: User): Observable<UpdateResult> {
      console.log("user",user)
    const valid = UserValidetor(user)
    
      if (valid.error) { throw new HttpException(valid.error.details[0].message, HttpStatus.BAD_REQUEST); } else {
        const { firstname, lastname, email, password } = user;
        return this.doesUserExist(email).pipe(tap((doesUserExist: boolean) => {
          if (doesUserExist)
            throw new HttpException('A user with this email address already exists.', HttpStatus.BAD_REQUEST);
                
            
        }), switchMap(() => {
          return this.doesUserIDExist(id).pipe(tap((doesIdExist: boolean) => {
            if (doesIdExist)
              throw new HttpException('A user with this Id Does not exists.', HttpStatus.BAD_REQUEST);
          }), switchMap(()=>{
          return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
              return from(this.userRepository.update(id, {
              id,
              firstname,
              lastname,
              email,
              password: hashedPassword,
              }))
              }))
            }))
        }))
      }
    }

    DeleteUser(id: number): Observable<DeleteResult>{
        return from(this.userRepository.delete(id))
    }

}
