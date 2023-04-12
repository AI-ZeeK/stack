import {
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  UseGuards,
  Request,
  Param,
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
  @UseGuards(UserGuard)
  @Delete('post/:postId')
  async deletePostComment(@Param('postId') postId: string): Promise<object> {
    const allComments = await this.getAllComments();
    allComments.map((element) => {
      element.postId === postId
        ? this.commentService.deleteComment({ id: element?.id })
        : null;
    });
    return { message: 'Deleted' };
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<object> {
    const data = await this.commentService.deleteComment({ id });
    if (!data)
      throw new HttpException('No post to delete', HttpStatus.BAD_REQUEST);
    return { message: 'Deleted' };
  }
  @UseGuards(UserGuard)
  @Patch(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() comment: commentDTO,
  ): Promise<CommentsModel> {
    return await this.commentService.updateComment(
      { id },
      { comment: comment.comment },
    );
  }
}
