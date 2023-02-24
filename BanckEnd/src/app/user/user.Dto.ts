import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty, Matches, MinLength } from "class-validator";


export class CreateUserDto {
    @MinLength(3, {message:'O nome deve ser composto por pelo menos 3 caracteres!'})
    @IsNotEmpty({message:'O nome é obrigatoria.'}) 
    username: string;

    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'A senha deve ter um número uma letra maiúscula e uma letra minúscula',
      })  
    @MinLength(8, {message: 'A senha deve ser composta por pelo menos 8 caracteres!'})
    @IsNotEmpty({message:'A senha é obrigatoria.'})
    password: string;
}

