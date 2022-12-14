import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MacskakDto } from './macskak.dto';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 

  
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

  
}
  
