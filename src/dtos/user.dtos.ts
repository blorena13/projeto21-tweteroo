import { IsNotEmpty, IsString, IsUrl} from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl({}, {message: 'All fields are required!'})
    avatar: string;
}