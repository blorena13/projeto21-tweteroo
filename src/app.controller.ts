import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("sign-up")
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUserDto) {
    try {
      return this.appService.createUser(body);
    } catch (error) {
      throw new HttpException("deu ruim!", HttpStatus.CONFLICT);
    }
  }

  @Get("/users")
  getUser() {
    return this.appService.getUsers();
  }

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  }


  @Post("/tweets")
  createTweet(@Body() body: CreateTweetDto) {
    try {
      const tweet = this.appService.createTweet(body);
      if(!tweet){
        throw new HttpException("deu ruim ", HttpStatus.UNAUTHORIZED);
      }
      return tweet;
    } catch (error) {
      throw new HttpException("deu ruim na authorization!", HttpStatus.UNAUTHORIZED);
    }
  }

  @Get("/tweets")
  getTweets(@Query('page') page: number) {
   try{

    if (page && (isNaN(page) || page <= 1)) {
      throw new HttpException("Informe uma página válida!", HttpStatus.BAD_REQUEST);
    }
    return this.appService.getTweets(page);
   } catch(error){
    throw new HttpException("deu ruim no params", HttpStatus.BAD_REQUEST);
   }
  }
  @Get("/tweets/:username")
  getByUsername(@Param('username') username: string) {
    return this.appService.getByUsername(username)
  }
}

