import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
    imports: [
      UserModule,
      // JwtModule.register({
      //   global: true,
      //   secret: process.env.JWT_SECRET as string
      // })
      JwtModule.registerAsync({
        inject: [ConfigService],
  
        useFactory: (configService: ConfigService) => ({
          secret:
            configService.getOrThrow<string>('JWT_SECRET'),
  
          signOptions: {
            expiresIn:
              configService.getOrThrow<number>(
                'JWT_EXPIRATION',
              ),
          },
        }),
      }),


    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

