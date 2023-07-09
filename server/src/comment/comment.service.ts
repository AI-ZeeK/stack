/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Comments, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAllComments(): Promise<Comments[] | null> {
    return this.prisma.comments.findMany();
  }

  async createComment(
    data: Prisma.CommentsUncheckedCreateInput,
  ): Promise<Comments> {
    return this.prisma.comments.create({
      data,
    });
  }
  async deleteComment(
    where: Prisma.CommentsWhereUniqueInput,
  ): Promise<Comments> {
    return this.prisma.comments.delete({
      where,
    });
  }
  async deletePostComments(where: Prisma.CommentsWhereInput): Promise<any> {
    return this.prisma.comments.deleteMany({
      where,
    });
  }
  async updateComment(
    where: Prisma.CommentsWhereUniqueInput,
    data: Prisma.CommentsUncheckedCreateInput,
  ): Promise<Comments> {
    return this.prisma.comments.update({
      where,
      data,
    });
  }
}
