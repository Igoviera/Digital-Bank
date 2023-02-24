import { Decimal } from "@prisma/client/runtime";
import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";


export class valorDto {
    balance: Decimal;
}