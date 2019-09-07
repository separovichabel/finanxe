import { Controller, Get } from '@nestjs/common';
import { AppLogger } from '../../app.logger';

@Controller()
export class AppController {

  constructor(
    readonly logger: AppLogger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('LOG FUNCIONANDO', 'getHello');
    return 'yea';
  }
}
