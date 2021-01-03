import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthPayload } from './auth-payload.decorator';
import { AuthService } from './auth.service';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  test(@AuthPayload() payload: any): string {
    return payload;
  }

  @Post()
  auth(@Body() body: AuthRequest): AuthResponse {
    return {
      token: this.authService.auth(body.email, body.password)
    };
  }
}
