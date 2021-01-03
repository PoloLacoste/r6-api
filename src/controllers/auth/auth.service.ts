import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  auth(email: string, password: string): string {
    const payload = {
      email: email,
      password: password
    };

    return this.jwtService.sign(payload, {
      secret: process.env.SECRET
    });
  }
}
