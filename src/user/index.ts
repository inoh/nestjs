import { Module } from '@nestjs/common';
import { PrismaService } from 'common';
import { Controller } from './controller';
import { UserService } from './service';

@Module({
  controllers: [Controller],
  providers: [PrismaService, UserService],
})
export class UserModule {}
