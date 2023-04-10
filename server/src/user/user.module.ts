import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/constants/constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '86400' },
    }),
  ],
})
export class UserModule {}
