import { Exclude } from "class-transformer";
import { Todo } from "src/todos/entities/todo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];

    @CreateDateColumn()
    createdAt: Date;
}