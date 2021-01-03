import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { R6Service } from './r6.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './controllers/auth/auth.service';
import { JwtStrategy } from './controllers/auth/jwt.strategy';
import { IdController } from './controllers/id/id.controller';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AuthController,
    IdController
  ],
  providers: [
    AuthService,
    JwtStrategy,
    R6Service
  ],
})
export class AppModule { }
