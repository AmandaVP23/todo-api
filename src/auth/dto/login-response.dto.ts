import { User } from "src/users/entities/user.entity";

export class LoginResponseDTO {
    access_token: string;
    user: Omit<User, 'todos'>;
}