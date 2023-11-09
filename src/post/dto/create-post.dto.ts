import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    thumbnail: string;

    @IsNotEmpty()
    status: number

    user: User
}