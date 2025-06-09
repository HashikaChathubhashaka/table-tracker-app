import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/roles.guard';
import { Roles } from '../authentication/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  async deleteUserByEmail(@Body('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }

  @Get('all') // getting user details -> not getting the password
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
