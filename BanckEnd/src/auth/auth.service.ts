import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './errors/unauthorized.error';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { username } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined
        } 
      }
      return null
    }
  }

  async Login(user) {
    const payload = {
      sub: user.id,
      username: user.username,
    }
    const token = await this.jwtService.sign(payload);
    return {
      access_token: token
    } 
  }

  async Logout(userId: number) {
    return `Usuario `
    console.log('usuario deslogou, id: ' + userId)
  }

}
