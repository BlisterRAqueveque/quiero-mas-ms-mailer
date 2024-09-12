import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { envs } from 'src/configuration';
import { UserDto } from 'src/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class NodemailerService {
  constructor(
    private readonly mailer: MailerService,
    private readonly auth: AuthService,
  ) {}

  async sendMail(user: UserDto) {
    const token = await this.auth.generateJwt(user);

    const mail = email(user, token);
    return await this.mailer.sendMail({
      bcc: user.email,
      replyTo: 'raqueveque@blister.com.ar',
      from: envs.m_address,
      subject: 'Nuevo usuario registrado',
      text: `Verificar mediante: ${envs.api_url}auth/verificar?token=${token}`,
      html: mail,
    });
  }
}

const email = (user: UserDto, token: string) => {
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verificación de Correo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #555555;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      color: #ffffff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Confirma tu correo electrónico</h1>
    <p>Hola,</p>
    <p>Gracias por registrarte ${user.name} ${user.last_name}. Por favor, confirma tu correo electrónico haciendo clic en el botón de abajo:</p>
    <p>
      <a href="${envs.api_url}auth/verificar?token=${token}" class="button">Confirmar correo</a>
    </p>
    <p>Si no te has registrado en nuestra plataforma, ignora este correo.</p>

    <div class="footer">
      <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>

    `;
};
