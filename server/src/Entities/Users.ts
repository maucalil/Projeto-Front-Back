import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IUser } from "../Interfaces/IUser";
@Entity()
export class Users extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    role: string = "normal";

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
}
