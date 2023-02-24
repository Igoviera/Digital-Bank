import { Module } from '@nestjs/common';
import { AccountsModule } from './app/accounts/accounts.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule,UserModule,AccountsModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}