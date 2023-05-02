import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }
  @Post('create')
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }
  @Get(':id')
  getById(@Param('id') id: any) {
    return this.userService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: any) {
    return this.userService.delete(id);
  }
}
