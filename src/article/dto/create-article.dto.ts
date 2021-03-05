import { IsNotEmpty, IsString } from "class-validator"

export class CreateArticleDto {

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string
}
