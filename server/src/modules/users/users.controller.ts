import { Body, ClassSerializerInterceptor, Controller, Get, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '@src/common/interceptors/response.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';


@UseInterceptors(ClassSerializerInterceptor, ResponseInterceptor)
@Controller('')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/user')
  // @UseGuards(JwtAuthGuard)
  findCurrentUser(@User() user: UserEntity) {
    return this.userService.findByUsername(user.username);
  }

  @Put()
  // @UseGuards(JwtAuthGuard)
  updateUser(@User() { username }: UserEntity, @Body() data: UpdateUserDTO) {
    return this.userService.updateUser(username, data);
  }
}
