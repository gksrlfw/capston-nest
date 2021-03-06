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
import {UserDTO} from "@src/modules/auth/dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(credentials: SignupDTO): Promise<AuthResponse> {
    try {
      const exEmail = await this.userRepository.findOne({ email: credentials.email });
      if(exEmail) throw new BadRequestException('Already exist email');
    
      const exUsername = await this.userRepository.findOne({ username: credentials.username });
      if(exUsername) throw new BadRequestException('Already exist username');
      
      const user = this.userRepository.create({ ...credentials, created: Time.now(), updated: Time.now() });
      await this.userRepository.save(user);
      return { ...user.toJSON() };
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
    throw new BadRequestException('Does not exist user');
  }
  
  async getMypage(user: UserDTO) {
    console.log(user);
    return this.userRepository.findOne({ id: user.id });
  }
}
