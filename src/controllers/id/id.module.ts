import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';

import { IdController } from './id.controller';
import { R6Service } from './../../r6.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    IdController
  ],
  providers: [
    R6Service
  ],
})
export class IdModule { }
