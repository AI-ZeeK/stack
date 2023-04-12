import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { Post as PostModel } from '@prisma/client';
import { postDto } from './dto/post.dto';
import { UserGuard } from 'src/user/user.guard';
@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Get()
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }
  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostModel> {
    const data = await this.postService.getPost({ id });
    if (!data)
      throw new HttpException('No post with that id', HttpStatus.NOT_FOUND);
    return data;
  }

  @UseGuards(UserGuard)
  @Post()
  async createPost(@Body() post: postDto): Promise<PostModel> {
    const author = await this.userService.getUser({ id: post.authorId });

    if (!author) throw new HttpException('No Author', HttpStatus.BAD_REQUEST);

    return await this.postService.createPost(post);
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<object> {
    const post = await this.getPost(id);

    if (!post)
      throw new HttpException('No post with that id', HttpStatus.NOT_FOUND);

    if (post.authorId !== req.user.id)
      throw new HttpException(
        "cannot delete post that doesn't belong to you",
        HttpStatus.FORBIDDEN,
      );
    await this.postService.deletePost({ id });
    return { message: 'Deleted' };
  }
}
