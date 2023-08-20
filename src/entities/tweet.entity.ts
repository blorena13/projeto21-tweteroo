import { User } from "./user.entity";


export class Tweet {
    private username: string;
    private tweet: string;

    constructor(username: string, tweet: string){
        this.username = username;
        this.tweet = tweet;
    }

    getUsername(): string {
        return this.username;
    }
}