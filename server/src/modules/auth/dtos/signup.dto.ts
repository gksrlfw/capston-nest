import { IsString, MaxLength, MinLength } from 'class-validator';
import { SigninDTO } from './signin.dto';

export class SignupDTO extends SigninDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  address: string;

  @IsString()
  gu: string;
}
