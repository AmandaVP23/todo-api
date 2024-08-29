import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CursorPaginationDTO {
    @ApiPropertyOptional()
    cursor?: string;

    @ApiPropertyOptional()
    limit?: number;
}