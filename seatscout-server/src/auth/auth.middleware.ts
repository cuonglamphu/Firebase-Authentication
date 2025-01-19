import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('No token provided');
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Invalid token format');
      }

      const decodedToken = await this.authService.verifyIdToken(token);

      req['user'] = decodedToken.data.user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
