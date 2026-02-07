import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { EmailOtp, EmailOtpSchema } from './schemas/email-otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailOtp.name, schema: EmailOtpSchema },
    ]),
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
