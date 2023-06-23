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
exports.JobApplicationController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const job_application_service_1 = require("./job-application.service");
const multer_1 = require("multer");
const path_1 = require("path");
const job_appplication_dto_1 = require("./job-appplication.dto");
let JobApplicationController = class JobApplicationController {
    constructor(jobApplicationService, configService) {
        this.jobApplicationService = jobApplicationService;
        this.configService = configService;
    }
    async create(file, dto) {
        return this.jobApplicationService.fileUpload(file, dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files', {
        storage: (0, multer_1.diskStorage)({
            destination: './files',
            filename: (req, file, callable) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callable(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg|ext|txt|pdf)' }),
        ],
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, job_appplication_dto_1.JobApplicationDto]),
    __metadata("design:returntype", Promise)
], JobApplicationController.prototype, "create", null);
JobApplicationController = __decorate([
    (0, common_1.Controller)('job-application'),
    __metadata("design:paramtypes", [job_application_service_1.JobApplicationService,
        config_1.ConfigService])
], JobApplicationController);
exports.JobApplicationController = JobApplicationController;
//# sourceMappingURL=job-application.controller.js.map