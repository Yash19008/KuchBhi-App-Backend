import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { EmailOtp, EmailOtpDocument } from './schemas/email-otp.schema';

@Injectable()
export class OtpService {
    constructor(
        @InjectModel(EmailOtp.name)
        private otpModel: Model<EmailOtpDocument>,
    ) { }

    // Generate 6-digit OTP
    generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Hash OTP
    hashOtp(otp: string): string {
        return crypto
            .createHash('sha256')
            .update(otp)
            .digest('hex');
    }

    // Create or replace OTP
    async createOtp(email: string) {
        const otp = this.generateOtp();
        const otpHash = this.hashOtp(otp);

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        await this.otpModel.findOneAndUpdate(
            { email },
            { otpHash, expiresAt, attempts: 0 },
            { upsert: true },
        );

        return otp; // IMPORTANT: returned only for email sending
    }

    // Verify OTP
    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const record = await this.otpModel.findOne({ email });

        if (!record) return false;
        if (record.expiresAt < new Date()) return false;
        if (record.attempts >= 5) return false;

        const incomingHash = this.hashOtp(otp);

        if (incomingHash !== record.otpHash) {
            record.attempts += 1;
            await record.save();
            return false;
        }

        // success → delete OTP
        await record.deleteOne();
        return true;
    }
}
