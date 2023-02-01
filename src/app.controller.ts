import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import registerDto from './register.dto';
import RegisterDto from './register.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Post('/register')
  register(@Body() registerdto: RegisterDto) {
    if (
      !registerdto.email ||
      !registerdto.password ||
      registerdto.passwordAgain
    ) {
      throw new BadRequestException('All fields are required');
    }
    if (registerdto.email.includes('@')) {
      throw new BadRequestException('Email must contain a @ charater');
    }
    if (registerdto.password !== registerdto.passwordAgain) {
      throw new BadRequestException('Two password not the same');
    }
    if (registerdto.passwordAgain.length < 8) {
      throw new BadRequestException('Min. 8 charater0');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = new User();
    user.email = registerdto.email;
    user.password = bcrypt.hash(registerdto.password, 15);
    userRepo.save(user);
  }
}
