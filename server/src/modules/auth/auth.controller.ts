import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '@src/common/guards/auth-jwt.guard';
import { ResponseInterceptor } from '@src/common/interceptors/response.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/common/guards/auth-local.guard';
import { UserEntity } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { SigninDTO } from './dtos/signin.dto';
import { SignupDTO } from './dtos/signup.dto';
import { UserDTO } from './dtos/user.dto';


@UseInterceptors(ClassSerializerInterceptor, ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() credentials: { user: SignupDTO }) {
    return this.authService.signup(credentials.user);
  }

  //@UseGuards(AuthGuard('local'))  // selected localstrategy
  // It is exactly same with upon. It executed local strategy's validation and that inserted user in request.
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(
    @Body() credentials: { user: SigninDTO },
    @User() user: UserEntity,
  ) {
    // @Request req를 매개변수로 하여, req.user로 받아도 되지만 여기서는 decorator를 만들어서 사용했다
    // const user = await this.authService.singin(users);
    // return { user }; 
    return this.authService.signin(user);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async unsubscribe(@User() user: UserDTO) {
    return this.authService.unsubscribe(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  async refresh(@User() user: UserDTO) {
    return user;
  }

  /**
   * 이렇게하면 서버에서는 로그아웃을 구현할 수 없음
   * 토큰을 디비에 저장하고, 로그아웃하면 토큰을 디비에서 삭제한다
   * 이렇게하면 완전히 로그아웃이 된 것처럼 볼 수 있다
   * 일단은 중요한건 아니니까 이렇게 하자..
   */
  @UseGuards(JwtAuthGuard)
  @Get('/signout')
  async signout(@User() user: UserDTO) {
    return user;
  }


  // 로그인이 필요한 작업은 JwtGuard를 통과해야 한다!
  // @UseGuards(JwtAuthGuard)
  @Get('/test')
  calll(@User() user: UserEntity) {
    // console.log(user);
    throw new BadRequestException('asdfadsf')
    // return this.authService.test();
    // try {
    //   return this.authService.test();
    // }
    // catch(err) {
    //   console.log(err);
    //   throw new BadRequestException(err.message);
    // }
  }
}
