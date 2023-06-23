/// <reference types="multer" />
import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { JobApplicationDto } from './job-appplication.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class JobApplicationService {
    private readonly jobApplicationRepository;
    private mailerService;
    constructor(jobApplicationRepository: Repository<JobApplication>, mailerService: MailerService);
    create(jobApplication: JobApplication): Promise<JobApplication>;
    fileUpload(files: Express.Multer.File, dto: JobApplicationDto): Promise<any>;
}
