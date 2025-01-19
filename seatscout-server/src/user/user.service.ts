import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  async findByEmail(email: string): Promise<User | undefined> {
    return {
      name: 'Cuong Lam',
      email: 'test@test.com',
      avatar:
        'https://cuongday.com/_next/image?url=%2Fimages%2Favatar.png&w=256&q=100',
      stats: {
        posts: 42,
        followers: 1234,
        following: 321,
      },
    };
  }
}
