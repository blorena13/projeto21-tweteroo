import { IsNotEmpty, IsString} from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    tweet: string;
}