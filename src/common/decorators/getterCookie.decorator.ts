import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const cookieGetterAdmin = createParamDecorator(
  async (_: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Customer unauthorized');
    }
    return refreshToken;
  },
);
