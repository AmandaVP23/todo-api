import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CursorPaginationDTO } from 'src/misc/dto/cursor-pagination.dto';

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
        return this.todosService.create(createTodoDto, req['userId']);
    }
    
    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Gets logged user todos list' })
    async findMine(@Request() req, @Query() paginationDTO: CursorPaginationDTO) {
        const todosList = await this.todosService.findUserTodos(req['userId'], paginationDTO);
    
        return {
            data: todosList,
            nextCursor: todosList.length > 0
            ? todosList[todosList.length - 1].createdAt.toISOString()
            : null,
        }
    }
    
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    findOne(@Request() req, @Param('id') id: string) {
        return this.todosService.findOne(+id, req['userId']);
    }
    
    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Updates a todo item' })
    @ApiBody({ type: UpdateTodoDto })
    update(@Request() req, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(req['userId'], +id, updateTodoDto);
    }
    
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Deletes a todo item' })
    remove(@Request() req, @Param('id') id: string) {
        return this.todosService.remove(req['userId'], +id);
    }
}
