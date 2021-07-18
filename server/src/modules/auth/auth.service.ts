import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Time from '@src/common/time';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/users.entity';
import { AuthResponse } from './dtos/auth.response';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(credentials: SignupDTO): Promise<AuthResponse> {
    try {
      const user = this.userRepository.create({ ...credentials, created: Time.now(), updated: Time.now() });
      await this.userRepository.save(user);
      return { ...user.toJSON() };
      // create token => 딱히 회원가입할 때 토큰을 만들어 줄 필요는 없을 듯..
      // const payload = { username: user.username };
      // const token = this.jwtService.sign(payload);
      // return { ...user.toJSON(), token };
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Username has already been taken');
      throw new InternalServerErrorException(err);
    }
  }

  // passport로부터 주입된 req.user를 활용한다
  async signin(user: UserEntity): Promise<AuthResponse> {
    const payload = { email: user.email, id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { ...user.toJSON(), token };
  }

  async unsubscribe(id: number) {
    const user = await this.userRepository.find({ id });
    if(user.length) return this.userRepository.delete({ id });
    throw new BadRequestException('이미 삭제된 유저입니다.'); 
  }
}
