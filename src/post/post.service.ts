import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: any): Promise<Post> {
    return this.postRepository.findOneBy({ id: id });
  }

  async create(dto: PostDto): Promise<PostDto> {
    const Post = await this.postRepository.create(dto);
    return await this.postRepository.save(dto);
  }

  async update(id: any, dto: PostDto): Promise<Post> {
    const old = await this.postRepository.findOneBy({ id: id });

    const newdata = await this.postRepository.save({ ...dto, id: id });

    return newdata;
  }

  async delete(id: any): Promise<any> {
    const oldBand = await this.postRepository.findOneBy({ id: id });
    const r = await this.postRepository.delete({ id: id });
    if (r.affected == 1) {
      return 'band is deleted';
    }
    return 'band not found';
  }
}
