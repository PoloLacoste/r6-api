import { Module } from '@nestjs/common';

import { AuthModule } from './controllers/auth/auth.module';
import { IdModule } from './controllers/id/id.module';

@Module({
  imports: [
    AuthModule,
    IdModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
