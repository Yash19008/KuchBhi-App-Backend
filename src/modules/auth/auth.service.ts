import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string) {
        const user = await this.usersService.createUser({ email });

        const payload = {
            sub: user._id,
            role: user.role,
        };

        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
            user,
        };
    }
}
