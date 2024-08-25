import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    text: string;

    @ManyToOne(() => User, user => user.todos)
    user: User;

    // @ManyToOne(() => User, user => user.todos)
    // user: User;
    // status
}
