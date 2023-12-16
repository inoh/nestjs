import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'common';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      throw new BadRequestException('メールアドレスがすでに存在します');
    }
    return this.prisma.user.create({ data });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: params.where });
    if (!user) {
      throw new NotFoundException(`User with ID ${params.where.id} not found.`);
    }

    return this.prisma.user.update(params);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    if (user) {
      return this.prisma.user.delete({ where });
    }
  }
}
