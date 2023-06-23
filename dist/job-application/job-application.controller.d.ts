/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { JobApplicationService } from './job-application.service';
import { JobApplicationDto } from './job-appplication.dto';
export declare class JobApplicationController {
    private readonly jobApplicationService;
    private readonly configService;
    constructor(jobApplicationService: JobApplicationService, configService: ConfigService);
    create(file: Express.Multer.File, dto: JobApplicationDto): Promise<any>;
}
