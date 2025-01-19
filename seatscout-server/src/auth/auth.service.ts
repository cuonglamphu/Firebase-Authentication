import { Injectable, UnauthorizedException } from '@nestjs/common';
import admin from '../../firebase.config';

@Injectable()
export class AuthService {
  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log(decodedToken);
      return {
        success: true,
        data: {
          user: {
            uid: decodedToken.uid,
            email: decodedToken.email,
          },
        },
        message: 'Token is valid',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
