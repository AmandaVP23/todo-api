import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDTO {
    @ApiProperty()
    username: string;

    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;
    
    @ApiProperty()
    password: string;
}