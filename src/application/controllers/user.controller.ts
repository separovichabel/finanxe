import { Controller, Get, Param, Body, Post, Delete, UsePipes, HttpException } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { UserService } from '../../infrastructure/service/user.service';
import { User } from '../../domain/entity/user.entity';
import { IdToEntity } from '../pipe/IdToEntity.pipe';

@Controller('users')
export class UserController {

  constructor(
    readonly userService: UserService,
    readonly logger: AppLogger,
  ) {}

  @Get()
  getMany(@Param() id: number): Promise<User[]> {
    return this.userService.getMany();
  }

  @Get(':id')
  @UsePipes(IdToEntity)
  getById(@Param('id') user: User): User {
    return user;
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.save(user);
  }

  @Delete(':id')
  @UsePipes(IdToEntity)
  async delete(@Param('id') user: User): Promise<User> {
    return await this.userService.delete(user);
  }
  
}
