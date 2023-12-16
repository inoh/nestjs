import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller';
import { AppService } from './service';

// TODO: Lambda にデプロイするためコメントアウト
// import { UserModule } from 'user';

@Module({
  // imports: [ConfigModule.forRoot(), UserModule],
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
