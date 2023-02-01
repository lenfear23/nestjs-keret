import {
<<<<<<< HEAD
  BadRequestException,
=======
>>>>>>> cb483f08141e5f645614f4496df9e1d06824205e
  Body,
  Controller,
  Get,
  Post,
<<<<<<< HEAD
=======
  Query,
  Param,
  Redirect,
>>>>>>> cb483f08141e5f645614f4496df9e1d06824205e
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
<<<<<<< HEAD
import registerDto from './register.dto';
import RegisterDto from './register.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';
=======
import { MacskakDto } from './macskak.dto';
import db from './db';
>>>>>>> cb483f08141e5f645614f4496df9e1d06824205e

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

 

  
  @Get('cats/fooldal')
  @Render('index')
  async listCats(@Query('search') search) {
    if (search > 0) {
      const [results] = await db.execute(
        `SELECT suly, szem_szin FROM macskak WHERE szem_szin LIKE "%?%"`,
        [search],
      );

      return { macskak: results };
    } else {
      const [rows] = await db.execute('SELECT * FROM macskak');
      return { macskak: rows };
    }
  }

  @Get('cats/new')
  @Render('form')
  newMacsekForm(){
    return{}
  }
<<<<<<< HEAD
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
=======

  @Post('cats/new')
  @Redirect()
  async newPainting(@Body() macsk: MacskakDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      [ macsk.suly, macsk.szem_szin],
    );
    return{
      url: 'fooldal'
    }
  }

  
>>>>>>> cb483f08141e5f645614f4496df9e1d06824205e
}
  
