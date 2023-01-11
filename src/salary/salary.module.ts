import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entitiy';
import { UserService } from 'src/user/services/user.service';
import { SalaryController } from './controllers/salary.controller';
import { SalaryEntity } from './models/salary.entity';
import { SalaryService } from './services/salary.service';

@Module({
  imports:[TypeOrmModule.forFeature([SalaryEntity,UserEntity])],
  controllers: [SalaryController],
  providers: [SalaryService,UserService]
})
export class SalaryModule {}
