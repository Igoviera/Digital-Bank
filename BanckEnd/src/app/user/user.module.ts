import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AccountsModule } from '../accounts/accounts.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports:[AccountsModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
