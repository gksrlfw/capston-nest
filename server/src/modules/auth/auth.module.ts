import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule
    // PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, LocalStrategy, AuthService]
})
export class AuthModule {}

// @Module({
//   imports: [
//     UsersModule,
//     TypeOrmModule.forFeature([UserEntity]),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: {
//         expiresIn: 3600,
//       },
//     }),
//   ],