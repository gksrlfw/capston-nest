import { IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  username: string;
}
