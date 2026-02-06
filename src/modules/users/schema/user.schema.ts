import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop({ default: 'USER' })
    role: 'USER' | 'ADMIN';

    @Prop({ default: 'ACTIVE' })
    status: 'ACTIVE' | 'BLOCKED';

    @Prop()
    lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
