import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
// import { User } from "./users/entities/user.entity";
// import { Todo } from "./todos/entities/todo.entity";
// import { BlacklistToken } from "./auth/entities/blacklist-token.entity";

dotenv.config();

console.log('dir:', __dirname);

export default new DataSource({
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER_PASSWORD,
    database: 'todo',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // entities: [User, Todo, BlacklistToken],
    synchronize: false, // shouldnt be used in production 
    migrations: ['src/migrations/**/*.ts'],
    migrationsTableName: 'migration_table',
});