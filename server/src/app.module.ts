import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { CommentController } from './comment/comment.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthMiddleware } from './middleware/authmiddleware.middleware';

@Module({
  imports: [UserModule, PostModule, CommentModule],
  controllers: [
    AppController,
    UserController,
    PostController,
    CommentController,
  ],
  providers: [
    AppService,
    PostService,
    UserService,
    CommentService,
    PrismaService,
  ],
})
export class AppModule {}
