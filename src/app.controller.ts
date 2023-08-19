import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService, TweetService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("sign-up")
  createUser(@Body() body: CreateUserDto) {
    try {
      return this.appService.createUser(body);
    } catch (error) {
      throw new HttpException("deu ruim!", HttpStatus.CONFLICT);
    }
  }

  @Get()
  getUser() {
    return this.appService.getUsers();
  }

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller("tweets")
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

  @Post()
  createTweet(@Body() body: CreateTweetDto) {
    try {
      return this.tweetService.createTweet(body)
    } catch (error) {
      throw new HttpException("deu ruim no create", HttpStatus.CONFLICT);
    }
  }

  @Get()
  getTweets() {
    return this.tweetService.getTweets();
  }
  @Get("hello")
  getHello(): string {
    return this.tweetService.getHello();
  }
}

