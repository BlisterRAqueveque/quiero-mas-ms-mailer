import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { NodemailerService } from './mailer.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MailController],
  providers: [MailService, NodemailerService],
})
export class MailModule {}
