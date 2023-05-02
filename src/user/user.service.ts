import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: any): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async create(dto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.create(dto);
    return await this.usersRepository.save(dto);
  }

  async update(id: any, dto: UserDto): Promise<User> {
    const old = await this.usersRepository.findOneBy({ id: id });

    const newdata = await this.usersRepository.save({ ...dto, id: id });

    return newdata;
  }

  async delete(id: any): Promise<any> {
    const oldBand = await this.usersRepository.findOneBy({ id: id });
    const r = await this.usersRepository.delete({ id: id });
    if (r.affected == 1) {
      return 'band is deleted';
    }
    return 'band not found';
  }
}
