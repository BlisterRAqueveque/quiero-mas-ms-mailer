import { MailerOptions } from '@nestjs-modules/mailer';
import { envs } from './envs';

export const mConfig: MailerOptions = {
  transport: {
    host: envs.m_host,
    authMethod: 'PLAIN',
    //authMethod: 'LOGIN',
    secure: false,
    port: envs.m_port,
    auth: {
      user: envs.m_user,
      pass: envs.m_pass,
    },
  },
};
