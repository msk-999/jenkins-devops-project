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
  async create(
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
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: 'sudarshan.naik1312@gmail',
        pass: 'oixagaznwoiqkxam',
      },
    });

    const mailOptions = {
      from: 'sudarshan.naik1312@gmail',
      to: 'sudarshan.naik@skeletos.in',
      subject: 'New Job Application Received',
      text: `A new job application has been submitted with the following details:
      Name: ${dto.name}
      Phone: ${dto.phone}
      Email: ${dto.email}
      Cover Letter: ${dto.coverLetter}`,
      attachments: [
        {
          filename: file.originalname,
          path: file.path,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return this.jobApplicationService.fileUpload(file, dto);
  }
}
