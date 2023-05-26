import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { JobApplicationDto } from './job-appplication.dto';
import { MailerService } from '@nestjs-modules/mailer';
import Helpers from 'src/common/helper/helpers.helper';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    private mailerService: MailerService,
  ) {}

  async create(jobApplication: JobApplication): Promise<JobApplication> {
    const job = await this.jobApplicationRepository.save(jobApplication);
    return Helpers.sendCreated(job);
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
      ...obj,
    });

   await this.mailerService.sendMail({
     from: `"noreply" <network@skeletos.in>`,
     to: `sudarshan.naik@skeletos.in`,
     subject: `Userdata can be seen as following`,
     html: `<h3>Hello Admin</h3>
    <h5>The details of the applicant are as follows:</h5>
    <p>Name: ${obj.name}</p>
    <p>Phone: ${obj.phone}</p>
    <p>Email: ${obj.email}</p>
    <p>Cover Letter: ${obj.coverLetter}</p>
    <p>Resume Name: ${obj.resumeName}</p>
    <p>Resume Path: <a href="${
      './files' + obj.resumePath
    }" download target="_blank">Download Resume</a></p>`,
   });


    return Helpers.sendCreated(transaction);
  }
}
