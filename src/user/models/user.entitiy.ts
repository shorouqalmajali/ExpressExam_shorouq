import { SalaryEntity } from "src/salary/models/salary.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ' '})
    firstname: string;

    @Column({default: ' '})
    lastname: string;

    @Column({unique : true})
    email: string;

    @Column({select: false})
    password: string;

     @OneToOne(() => SalaryEntity, (salary) => salary.user_id)
     salary:SalaryEntity



}