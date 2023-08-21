import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[] = [];

  constructor(){
    this.users = [
      new User("Lorena", "data:image/png;base64,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"),
      new User("lola",  "data:image/png;base64,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"),
      new User("Gabriel","data:image/png;base64,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")
    ]
  }

  createUser(body: CreateUserDto){
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }


  getHello(): string {
    return "I'm okay!";
  }


  createTweet(body: CreateTweetDto){
    const existsUser = this.users.find(user => user.getUsername() === body.username);
    if(!existsUser){
    return false;
    }
    const tweet = new Tweet(body.username, body.tweet);
    return this.tweets.push(tweet);
  }

  getTweets(page: number){
    if(!this.tweets){
      return [];
    }

    const completeTweets = this.tweets.map((tweet) => {
      const tweetUser = this.users.find(user => user.getUsername() === tweet.getUsername());
      return {...tweet, avatar: tweetUser.getAvatar()}
    } );

    if(page){
      const limit = 15;
      const start = (page - 1) * limit;
      const end = page * limit;

      return completeTweets.slice(start, end);
    }
    
    return completeTweets.slice(-15);
  }

  getByUsername(username: string) {
    const filteredTweets = this.tweets
    .filter((tweet) => tweet.getUsername() === username)
    .map((tweet) => {
      const user = this.users.find((u) => u.getUsername() === tweet.getUsername())
      return {...tweet, avatar: user.getAvatar()}
    })
    if(!filteredTweets){
      return [];
    }
    return filteredTweets;
  }
}
