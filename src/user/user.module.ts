import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryEntity } from 'src/salary/models/salary.entity';
import { SalaryService } from 'src/salary/services/salary.service';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entitiy';
import { UserService } from './services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity,SalaryEntity])],
    providers: [UserService,SalaryService],
    controllers:[UserController]
})
export class UserModule {}
