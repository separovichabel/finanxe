import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { UserService } from '../../infrastructure/service/first.service';
import { User } from '../../domain/entity/user.entity';

@Controller('users')
export class AppController {

  constructor(
    readonly userService: UserService,
    readonly logger: AppLogger,
  ) {}

  @Get()
  getMany(@Param() id: number): Promise<User[]> {
    return this.userService.getMany();
  }

  @Get(':id')
  getById(@Param() id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
  
}
