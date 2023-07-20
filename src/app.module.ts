import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobApplication } from './job-application/job-application.entity';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'skeletosuser',
      password: 'Admin@123',
      database: 'skeletosdb',
      entities: [User, JobApplication],
      synchronize: true,
    }),
    UserModule,
    JobApplicationModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
