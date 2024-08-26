import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from '../todo-status.enum';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiPropertyOptional()
    status: TodoStatus;
}
