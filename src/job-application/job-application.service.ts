import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { JobApplicationDto } from './job-appplication.dto';

@Injectable()
export class JobApplicationService {
  sendMail(mailOptions: { from: string; to: string; subject: string; text: string; attachments: { filename: string; path: string; }[]; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
  ) {}

  async create(jobApplication: JobApplication): Promise<JobApplication> {
    return await this.jobApplicationRepository.save(jobApplication);
  }

  async fileUpload(files: Express.Multer.File, dto: JobApplicationDto) {
    const obj = new JobApplication();
    obj.resumePath = files.filename;
    obj.resumeName = files.originalname;
    obj.name = dto.name;
    obj.phone = dto.phone;
    obj.email = dto.email;
    obj.coverLetter = dto.coverLetter;
    const transaction = await this.jobApplicationRepository.save({
      ...obj
    });
    return transaction;
  }
}
