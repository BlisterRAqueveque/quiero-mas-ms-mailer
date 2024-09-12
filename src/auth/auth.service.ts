import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto, UserDto } from './../common';

@Injectable()
export class AuthService {
  //* User's methods || Login & Register
  constructor(private jwtService: JwtService) {}

  /**
   * @param user find user from database
   * @returns generated jwt
   */
  async generateJwt(user: UserDto): Promise<string> {
    /**
     * @return: user.id, user.nickname
     * @description This params are for navigational permissions inside the API.
     *              Destructuring the token, gets the information.
     */
    const payload: PayloadDto = {
      sub: user.id,
      username: user.username,
      name: user.name,
      last_name: user.last_name,
    };
    return this.jwtService.signAsync(payload);
  }
}
