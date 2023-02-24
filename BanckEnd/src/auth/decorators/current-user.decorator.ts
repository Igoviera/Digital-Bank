import { Request } from "express";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
      
    return data ? user?.[data] : user;
    
  },

);
