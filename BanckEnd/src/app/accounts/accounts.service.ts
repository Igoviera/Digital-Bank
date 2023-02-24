import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async transfer(idReceiver: string, idSender: string, balanceSender: number, amount: number) {
        if (amount < 1) throw new BadRequestException('O valor minimo para transferencia deve ser maior ou igual a 1R$');
        if (balanceSender < amount) throw new BadRequestException('O saldo é insuficiente');
        try {
            const data = await this.prismaService.$transaction([

                this.prismaService.transactions.create({
                    data:{
                        value: amount,
                        debitedAccountld:idSender,
                        crediteAccountld:idReceiver
                    }
                }),

                this.prismaService.accounts.update({
                    where: { id: idSender },
                    data: {
                        balance: { decrement: amount },
                    },
                }),

                this.prismaService.accounts.update({
                    where: { id: idReceiver },
                    data: {
                        balance: { increment: amount },
                    },                  
                }),

            ]);

        } catch (error) {
            console.log(error)
        }
    }
}
