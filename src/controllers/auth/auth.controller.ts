import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

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

  @Post()
  auth(@Body() body: AuthRequest): AuthResponse {
    return {
      token: this.authService.auth(body.email, body.password)
    };
  }
}
