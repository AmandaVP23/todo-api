import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('todo')
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}
     
    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create new Todo item' })
    @ApiBody({ type: CreateTodoDto })
    create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
        console.log(req['user']);
        return this.todosService.create(createTodoDto, req['user'].id);
    }
    
    @Get()
    findAll() {
        return this.todosService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todosService.findOne(+id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(+id, updateTodoDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todosService.remove(+id);
    }
}
