import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OtpService } from '../otp/otp.service';
import { MailService } from '../mail/mail.service';
import { otpEmailTemplate } from '../mail/templates/otp-email';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly otpService: OtpService,
        private readonly mailService: MailService,
    ) { }

    // Request OTP
    async requestOtp(email: string) {
        await this.usersService.createUser({ email });

        const otp = await this.otpService.createOtp(email);

        await this.mailService.sendMail(
            email,
            'Your KuchBhi Login OTP',
            otpEmailTemplate(otp),
        );

        return { message: 'OTP sent to email' };
    }

    // Verify OTP & Login
    async verifyOtp(email: string, otp: string) {
        const isValid = await this.otpService.verifyOtp(email, otp);

        if (!isValid) {
            throw new UnauthorizedException('Invalid or expired OTP');
        }

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // mark email verified
        user.isEmailVerified = true;
        user.lastLoginAt = new Date();
        await user.save();

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
