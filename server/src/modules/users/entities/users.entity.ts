import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { createHashedPassword, makePasswordHashed } from '@src/common/utilities/cipher';


@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @Exclude()
  @IsString()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  @IsString()
  salt: string;

  @IsString()
  @Column()
  gu: string;

  @IsString()
  @Column()
  address: string;
  
  @BeforeInsert()
  async hashPassword() {
    // this.password = await bcrypt.hash(this.password, 10);
    const { password, salt } = (await createHashedPassword(this.password));
    this.password = password;
    this.salt = salt;
  }

  async comparePassword(input: string, salt: string) {
    // return bcrypt.compare(input, this.password);
    return makePasswordHashed(input, salt);
  } 

  toJSON() {
    return classToPlain(this);
  }
}