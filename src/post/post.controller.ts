import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Controller('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.findAll();
  }
  @Post('create')
  create(@Body() dto: PostDto) {
    return this.postService.create(dto);
  }
  @Get(':id')
  getById(@Param('id') id: any) {
    return this.postService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PostDto) {
    return this.postService.update(id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: any) {
    return this.postService.delete(id);
  }
}
