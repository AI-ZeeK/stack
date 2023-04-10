/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);

    let token = req.header('Authorization');

    if (!token) {
      throw new HttpException('Invalid authorization', HttpStatus.FORBIDDEN);
    }

    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1];
    }

    // req.user = jwt.verify(token, <any>process.env.JWT_SECRET);

    next();
  }
}
