import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import Helpers from 'src/common/helper/helpers.helper';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: any): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async create(dto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.save(dto);
    const obj = new User();
    obj.name = user.name;
    obj.email = user.email;
    obj.phone = user.phone;
    obj.requirements = user.requirements;
    await this.mailerService.sendMail({
      from: `"noreply" <network@skeletos.in>`,
      to: `sudarshan.naik@skeletos.in`,
      subject: `Userdata can be seen as following`,
      html: `<h3>Hello Admin</h3>
      <p>Name: ${obj.name}</p>
    <p>Phone: ${obj.phone}</p>
    <p>Email: ${obj.email}</p>
    <p>Requirements: ${obj.requirements}</p>
    `,
    });

    return Helpers.sendCreated(user);
  }

  async update(id: any, dto: UserDto): Promise<User> {
    const old = await this.usersRepository.findOneBy({ id: id });

    const newdata = await this.usersRepository.save({ ...dto, id: id });

    return Helpers.sendUpated(newdata);
  }

  async delete(id: any): Promise<any> {
    const oldBand = await this.usersRepository.findOneBy({ id: id });
    const r = await this.usersRepository.delete({ id: id });
    if (r.affected == 1) {
      return 'band is deleted';
    }
    return Helpers.sendDeleted();
  }
}
