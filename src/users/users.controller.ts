import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body('username') username: string): Promise<User> {
    return this.usersService.createUser(username);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
