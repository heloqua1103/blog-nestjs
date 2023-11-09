import { IsNotEmpty } from "class-validator";

export class UpdatePostDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    thumbnail: string;
    status: number
}