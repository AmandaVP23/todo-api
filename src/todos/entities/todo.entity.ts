import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "../todo-status.enum";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.todos)
    user: User;

    @Column({
        type: 'enum',
        enum: TodoStatus,
        default: TodoStatus.PENDING,
    })
    status: TodoStatus;
}
