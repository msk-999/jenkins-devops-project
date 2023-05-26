import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from 'src/job-application/job-application.entity';
import { JobApplicationModule } from 'src/job-application/job-application.module';
import { JobApplicationService } from 'src/job-application/job-application.service';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: { user: 'network@skeletos.in', pass: 'Pass@2023' },
        tls: {
          rejectUnauthorized: false,
        },
        // template: {
        //   dir: join(__dirname, '/template'),
        //   adapter: new HandlebarsAdapter(),
        // },
      },
    }),
    TypeOrmModule.forFeature([JobApplication]),
    JobApplicationModule,
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  providers: [JobApplicationService, UserService],
  exports: [JobApplicationService, UserService],
})
export class MailModule {}
