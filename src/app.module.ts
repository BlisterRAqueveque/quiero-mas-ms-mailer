import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { mConfig } from './configuration';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MailerModule.forRoot(mConfig), MailModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
