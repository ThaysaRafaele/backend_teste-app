import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User) {
    const isValidCep = await this.usersService.validateCep(user.cep);
    if (!isValidCep) {
      return { error: 'CEP inválido' };
    }
    return this.usersService.createUser(user);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //   @Put(':id')
  //   updateUser(@Param('id') id: string, @Body() updatedUser: Partial<User>) {
  //     return this.usersService.updateUser(+id, updatedUser);
  //   }
}
