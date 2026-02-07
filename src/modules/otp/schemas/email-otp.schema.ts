import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailOtpDocument = EmailOtp & Document;

@Schema({ timestamps: true })
export class EmailOtp {
    @Prop({ required: true, lowercase: true, index: true })
    email: string;

    @Prop({ required: true })
    otpHash: string;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({ default: 0 })
    attempts: number;
}

export const EmailOtpSchema = SchemaFactory.createForClass(EmailOtp);
EmailOtpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 },
);