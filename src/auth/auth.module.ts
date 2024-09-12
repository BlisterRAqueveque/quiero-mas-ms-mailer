import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/configuration';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwt_seed,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
