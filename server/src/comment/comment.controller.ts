import {
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentDTO } from './dto/comment.dto';
import { Comments as CommentsModel } from '@prisma/client';
import { PostService } from 'src/post/post.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Get()
  async getAllComments(): Promise<CommentsModel[]> {
    return this.commentService.getAllComments();
  }
  @UseGuards(UserGuard)
  @Post()
  async createComment(
    @Body() comment: commentDTO,
    @Request() req: any,
  ): Promise<any> {
    if (!comment.comment || !comment.postId)
      throw new HttpException('No Input', HttpStatus.BAD_REQUEST);
    const post = await this.postService.getPost({ id: comment.postId });
    if (!post)
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);

    return this.commentService.createComment({
      comment: comment.comment,
      commentorId: req.user.id,
      postId: comment.postId,
    });
  }
}
