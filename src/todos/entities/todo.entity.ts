import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TodoStatus } from "../todo-status.enum";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        length: 255
    })
    title: string;

    @Column({
        length: 1000
    })
    description: string;

    @ManyToOne(() => User, user => user.todos)
    user: User;

    @Column({
        type: 'enum',
        enum: TodoStatus,
        default: TodoStatus.PENDING,
    })
    status: TodoStatus;

    @Column({ nullable: true })
    date: Date | null;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
