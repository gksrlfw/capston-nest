import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // Just call super() because Local do not have configuration options
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // If valid user and password, return user for passport
  // passport would create user object auto in request
  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password, user.salt))) {
      throw new UnauthorizedException(
        'Invalid credentials in find user or compare password',
      );
    }
    return user;
  }
}
