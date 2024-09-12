import { Injectable } from '@nestjs/common';
import { NodemailerService } from './mailer.service';
import { UserDto } from 'src/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: NodemailerService) {}

  create(createMailDto: UserDto) {
    this.mailService.sendMail(createMailDto);
    return;
  }
}
