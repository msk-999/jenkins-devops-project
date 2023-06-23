"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_application_entity_1 = require("./job-application.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const helpers_helper_1 = require("../common/helper/helpers.helper");
const path_1 = require("path");
let JobApplicationService = class JobApplicationService {
    constructor(jobApplicationRepository, mailerService) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.mailerService = mailerService;
    }
    async create(jobApplication) {
        const job = await this.jobApplicationRepository.save(jobApplication);
        return helpers_helper_1.default.sendCreated(job);
    }
    async fileUpload(files, dto) {
        const obj = new job_application_entity_1.JobApplication();
        obj.resumePath = files.filename;
        obj.resumeName = files.originalname;
        obj.name = dto.name;
        obj.phone = dto.phone;
        obj.email = dto.email;
        obj.coverLetter = dto.coverLetter;
        const transaction = await this.jobApplicationRepository.save(Object.assign({}, obj));
        await this.mailerService.sendMail({
            from: `"noreply" <network@skeletos.in>`,
            to: `talent@skeletos.io`,
            subject: `Userdata can be seen as following`,
            html: `<h3>Hello Admin</h3>
    <h3>The details of the applicant are as follows:</h3>
    <p>Name: ${obj.name}</p>
    <p>Phone: ${obj.phone}</p>
    <p>Email: ${obj.email}</p>
    <p>Cover Letter: ${obj.coverLetter}</p>
    <p>Resume Name: ${obj.resumeName}</p>
    `,
            attachments: [
                {
                    path: (0, path_1.join)(__dirname, '../../files', obj.resumePath),
                    filename: obj.resumeName,
                    contentDisposition: 'attachment',
                },
            ],
        });
        return helpers_helper_1.default.sendCreated(transaction);
    }
};
JobApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], JobApplicationService);
exports.JobApplicationService = JobApplicationService;
//# sourceMappingURL=job-application.service.js.map