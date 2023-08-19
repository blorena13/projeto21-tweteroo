import { Module } from '@nestjs/common';
import { AppController, TweetController } from './app.controller';
import { AppService, TweetService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, TweetController],
  providers: [AppService, TweetService],
})
export class AppModule {}
