import { IsNumber, Min } from "class-validator";

export class UsertransferDto {
  @IsNumber()
  @Min(1, {message: "O valor minimo para tranferencia é de 1R$"})
  balance: number
}