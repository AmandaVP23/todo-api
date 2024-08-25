import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        TodosModule,
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: 'localhost',
            port: 3306,
            username: 'user',
            password: 'user',
            database: 'todo',
            // entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true, // shouldnt be used in production
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
