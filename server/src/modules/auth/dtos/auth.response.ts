import { UserEntity } from 'src/modules/users/entities/users.entity';

export interface AuthResponse extends Partial<UserEntity> {
  token?: string;
}
