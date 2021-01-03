import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
})
export class AuthModule { }
