import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'username' 
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password)
    if(user) {
      return user;
  } else {
      throw new UnprocessableEntityException('Nome ou email invalido.');
  }
  }
}
