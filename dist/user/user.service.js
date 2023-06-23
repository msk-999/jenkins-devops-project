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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const helpers_helper_1 = require("../common/helper/helpers.helper");
const mailer_1 = require("@nestjs-modules/mailer");
let UserService = class UserService {
    constructor(usersRepository, mailerService) {
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(id) {
        return this.usersRepository.findOneBy({ id: id });
    }
    async create(dto) {
        const user = await this.usersRepository.save(dto);
        const obj = new user_entity_1.User();
        obj.name = user.name;
        obj.email = user.email;
        obj.phone = user.phone;
        obj.requirements = user.requirements;
        await this.mailerService.sendMail({
            from: `"noreply" <network@skeletos.in>`,
            to: `talent@skeletos.io`,
            subject: `Userdata can be seen as following`,
            html: `<h3>Hello Admin</h3>
      <p>Name: ${obj.name}</p>
    <p>Phone: ${obj.phone}</p>
    <p>Email: ${obj.email}</p>
    <p>Requirements: ${obj.requirements}</p>
    `,
        });
        return helpers_helper_1.default.sendCreated(user);
    }
    async update(id, dto) {
        const old = await this.usersRepository.findOneBy({ id: id });
        const newdata = await this.usersRepository.save(Object.assign(Object.assign({}, dto), { id: id }));
        return helpers_helper_1.default.sendUpated(newdata);
    }
    async delete(id) {
        const oldBand = await this.usersRepository.findOneBy({ id: id });
        const r = await this.usersRepository.delete({ id: id });
        if (r.affected == 1) {
            return 'band is deleted';
        }
        return helpers_helper_1.default.sendDeleted();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map