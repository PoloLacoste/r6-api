import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Payload {
  email: string;
  password: string;
}

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);