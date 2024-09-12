import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';
import { UserDto } from '../common';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('createMail')
  create(@Payload() data: UserDto) {
    return this.mailService.create(data);
  }
}
