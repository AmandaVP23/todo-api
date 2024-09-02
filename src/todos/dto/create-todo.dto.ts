import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiPropertyOptional()
    date: Date | null;
}
