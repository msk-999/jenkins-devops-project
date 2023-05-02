import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobApplication } from './job-application/job-application.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Sudarshannk@13',
      database: 'skeletos',
      entities: [User, JobApplication],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    JobApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
