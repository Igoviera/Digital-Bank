import { Request } from 'express';

export interface AuthRequest extends Request {
  username: string;
  password: string;
}
