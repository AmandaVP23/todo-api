import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Todo')
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}
     
    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new Todo item' })
    @ApiBody({ type: CreateTodoDto })
    create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto, req['user'].id);
    }
    
    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Gets logged user todos list' })
    findMine(@Request() req) {
        return this.todosService.findUserTodos(req['user'].id);
    }
    
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    findOne(@Request() req, @Param('id') id: string) {
        return this.todosService.findOne(req['user'].id, +id);
    }
    
    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Updates a todo item' })
    @ApiBody({ type: UpdateTodoDto })
    update(@Request() req, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(req['user'].id, +id, updateTodoDto);
    }
    
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Deletes a todo item' })
    remove(@Request() req, @Param('id') id: string) {
        return this.todosService.remove(req['user'].id, +id);
    }
}
