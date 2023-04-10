import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getPost(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where,
    });
  }

  getAllPosts(): Promise<Post[] | null> {
    return this.prisma.post.findMany();
  }

  createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.delete({
      where,
    });
  }
}
