import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  AuthDecorator,
  RateLimitDecorator,
  RateLimitEnum,
} from 'src/decorators';

@ApiBearerAuth()
@ApiTags('Private')
@Controller('private')
@AuthDecorator()
@RateLimitDecorator(RateLimitEnum.TOKEN)
export class PrivateController {
  @Get()
  private() {
    return { message: 'Private' };
  }
}
