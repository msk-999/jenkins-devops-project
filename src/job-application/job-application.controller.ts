import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplication } from './job-application.entity';
import { JobApplicationService } from './job-application.service';
import * as nodemailer from 'nodemailer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JobApplicationDto } from './job-appplication.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly configService: ConfigService,
  ) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('resume'))
  // async create(
  //   @Body() body: JobApplication,
  //   @UploadedFile() resume: Express.Multer.File,
  // ): Promise<JobApplication> {
  //   const jobApplication = new JobApplication();
  //   jobApplication.name = body.name;
  //   jobApplication.phone = body.phone;
  //   jobApplication.email = body.email;
  //   jobApplication.coverLetter = body.coverLetter;
  //   jobApplication.resumePath = resume.filename;

  //   const createdJobApplication = await this.jobApplicationService.create(
  //     jobApplication,
  //   );

  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: this.configService.get<string>('MAIL_USER'),
  //       pass: this.configService.get<string>('MAIL_PASSWORD'),
  //     },
  //   });

  //   const mailOptions = {
  //     from: this.configService.get<string>('MAIL_FROM'),
  //     to: this.configService.get<string>('MAIL_TO'),
  //     subject: 'New Job Application',
  //     html: `
  //       <h2>New Job Application</h2>
  //       <ul>
  //         <li>Name: ${jobApplication.name}</li>
  //         <li>Phone: ${jobApplication.phone}</li>
  //         <li>Email: ${jobApplication.email}</li>
  //         <li>Cover Letter: ${jobApplication.coverLetter}</li>
  //         <li>Resume: <a href="${this.configService.get<string>(
  //           'APP_BASE_URL',
  //         )}/${jobApplication.resumePath}">Download</a></li>
  //       </ul>
  //     `,
  //   };

  //   await transporter.sendMail(mailOptions);

  //   return createdJobApplication;
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callable) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callable(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|ext|txt|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: JobApplicationDto,
  ) {
    return this.jobApplicationService.fileUpload(file, dto);
  }

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: this.configService.get<string>('MAIL_TO'),
      subject: 'New Job Application',
      html: `
        <h2>New Job Application</h2>
        <ul>
          <li>Name: ${JobApplication.name}</li>
          <li>Phone: ${JobApplication.phone}</li>
          <li>Email: ${JobApplication.email}</li>
          <li>Cover Letter: ${JobApplication.coverLetter}</li>
          <li>Resume: <a href="${this.configService.get<string>(
            'APP_BASE_URL',
          )}/${JobApplication.resumePath}">Download</a></li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);

    return createdJobApplication;

}
