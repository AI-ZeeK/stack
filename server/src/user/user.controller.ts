import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { userType } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.getUser({ id });
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user: userType): Promise<object> {
    if (!user.email || !user.password)
      throw new HttpException('Input not populated', HttpStatus.BAD_REQUEST);
    const name = user.email.split('@')[0];

    const isUser = await this.userService.getUser({ email: user.email });
    if (isUser) {
      const isMatch = await bcrypt.compare(user.password, isUser.password);
      if (!isMatch)
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

      delete isUser.password;
      const token = this.jwtService.sign(isUser);
      return { ...isUser, token };
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const data = await this.userService.createUser({
      name,
      email: user.email,
      password: hashedPassword,
    });
    delete data.password;
    const token = this.jwtService.sign(data);
    return { ...data, token };
  }
}
