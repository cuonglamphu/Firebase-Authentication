import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() request: Request) {
    // Lấy email từ user đã được decode trong middleware
    console.log(request['user']);
    const userEmail = request['user'].email;
    console.log(userEmail);
    const user = await this.userService.findByEmail(userEmail);
    return user;
  }
}
