import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RateLimitDecorator, RateLimitEnum } from 'src/decorators';

@ApiTags('Public')
@Controller('public')
@RateLimitDecorator(RateLimitEnum.IP)
export class PublicController {
  @Get()
  public() {
    return { message: 'Public' };
  }
}
