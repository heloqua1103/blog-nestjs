import { IsNotEmpty } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    thumbnail: string;

    status: number

    @IsNotEmpty()
    category: Category;

    user: User
}