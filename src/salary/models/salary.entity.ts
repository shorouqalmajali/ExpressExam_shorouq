import { UserEntity } from "src/user/models/user.entitiy";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('salary')
export class SalaryEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    salary: number;

    @Column()
    effective_date: string;
    
    @OneToOne(() => UserEntity, userEntity=>userEntity.salary)
    @JoinColumn({name:"user_id"})
    user_id:UserEntity
    



}