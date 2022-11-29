import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, RateLimitGuard } from './guards';

import { PrivateController } from './modules/private/private.controller';
import { PublicController } from './modules/public/public.controller';

@Module({
  imports: [],
  controllers: [PrivateController, PublicController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}
