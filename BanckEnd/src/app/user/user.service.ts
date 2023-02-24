import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './user.Dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { AccountsService } from '../accounts/accounts.service';
import { UsertransferDto } from './tranfer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly accountsService: AccountsService
    ) { }

    async create(data: CreateUserDto) {
        data.password = this.hashPassword(data.password)
        const userExists = await this.prisma.users.findFirst({
            where: {
                username: data.username
            }
        });

        if (userExists) {
            throw new Error('O nome de usuario já existe.')
        }
        const createUser = await this.prisma.users.create({
            data: {
                ...data,
                accounts: {
                    create: {
                        balance: 100
                    }
                }
            }
        })
        return {
            ...createUser,
            password: undefined
        }
    }

    async findId(id: string) {
        return await this.prisma.users.findUnique({
            where: {
                id
            },
            select: {
                username: true,
                accounts: {
                    include: {
                        debitedAccount: {
                            select: {
                                crediteAccount: {
                                    select: {
                                        users: { select: { username: true } }
                                    },
                                    //  include: { users: true } 
                                }, value: true
                            }
                        },
                        crediteAccount: {
                            select: {
                                debitedAccount: {
                                    select: {
                                        users: {
                                            select: { username: true }
                                        }
                                    },
                                    // include: { users: true },//TODO
                                }, value: true
                            }
                        }
                    }
                }
            },
        })
    }


    async update(id: string, data: CreateUserDto) {
        const userExists = await this.prisma.users.findUnique({
            where: {
                id
            }
        })

        if (!userExists) {
            throw new Error('O usuario não existe!')
        }
        return await this.prisma.users.update({
            data,
            where: {
                id
            }
        })
    }

    async transferUsername(
        usernameReceiver: string,
        usernameSender: string,
        amount: UsertransferDto['balance'],
    ) {
        const userSender = await this.prisma.users.findUnique({
            where: { username: usernameSender },
            include: { accounts: true, },

        })
        if (!userSender) throw new NotFoundException('Usuario inexistente');

        const userReceiver = await this.prisma.users.findUnique({
            where: { username: usernameReceiver },
            include: { accounts: true },
        });
        if (!userReceiver) throw new NotFoundException(`Conta de transferencia não existe!`);

        const idReceiver = userReceiver.accountsId;
        const idSender = userSender.accounts.id;
        const balanceSender = Number(userSender.accounts.balance)  //userSender.accounts.balance.toNumber();

        const result = await this.accountsService.transfer(
            idReceiver,
            idSender,
            balanceSender,
            amount
        );

        return result;
    }

    hashPassword(password: string) {
        const salt = genSaltSync(10)
        return hashSync(password, salt)
    }
}