import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UserService {
    private usersRepository;
    private mailerService;
    constructor(usersRepository: Repository<User>, mailerService: MailerService);
    findAll(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    create(dto: UserDto): Promise<UserDto>;
    update(id: any, dto: UserDto): Promise<User>;
    delete(id: any): Promise<any>;
}
